import React, { Component } from "react"
import { connect } from "react-redux"
import { saveSubmission } from "../../actions/submission"
import { updateSubmissionForm } from "../../actions/form"

import SearchSelectionInput from "../ui/SearchSelectionInput"
import SelectTimeInput from "../ui/SelectTimeInput"

import inspector from "schema-inspector"
import { initialValues, validations } from "./submission.schema"

class SubmissionForm extends Component {

  state = {
    newSubmission: initialValues,
    armorSet: {
      setName: "",
      head: {
        name: "",
        id: 1
      },
      torso: {
        name: "",
        id: 2
      },
      arms: {
        name: "",
        id: 3
      },
      waist: {
        name: "",
        id: 4
      },
      feet: {
        name: "",
        id: 5
      },
      charm: {
        slots: 0,
        skill1: {
          id: 149
        },
        amount1: 0,
        skill2: {
          id: 149
        },
        amount2: 0
      },
      decorations: [{ decorationAmount: "1", decorationName: "placeholder" }]
    },
    errors: {
      name: [],
    },
    styles: ["Guild", "Striker", "Adept", "Aerial"]
  }

  validateInput(field, value) {
    const validation = validations.properties[field]
    const result = inspector.validate(validation, value)
    return result.error
  }

  validateForm() {
    let valid = true
    const newErrors = Object.keys(this.state.newSubmission).reduce((accumulated, key) => {
      const value = this.state.newSubmission[key]
      const errors = this.validateInput(key, value)
      if (errors.length > 0) valid = false
      accumulated[key] = errors
      return accumulated
    }, {})
    return { valid, errors: newErrors }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    const result = this.validateForm()
    this.setState({ errors: result.errors })
    if (result.valid) {
      this.props.saveSubmission(this.state.newSubmission, this.state.armorSet)
    }
    console.log(this.state)
  }

  handleChange(field, e) {
    const newValue = e.target.value
    let stateChange = Object.assign({}, this.state)
    stateChange.newSubmission[field] = newValue
    stateChange.errors[field] = this.validateInput(field, newValue)
    this.setState(stateChange)
    this.props.updateSubmissionForm(stateChange.newSubmission)
  }

  selectItem = (type, item) => {
    console.log("valittu item ", type)
    let stateChange = Object.assign({}, this.state.newSubmission)
    stateChange[type] = item
    this.setState({ newSubmission: stateChange })
    this.props.updateSubmissionForm(stateChange)
  }

  setTime = (unit, amount) => {
    console.log("aika asetettu " + unit + " " + amount)
    let stateChange = Object.assign({}, this.state.newSubmission)
    stateChange[unit] = amount
    this.setState({ newSubmission: stateChange })
    this.props.updateSubmissionForm(stateChange)    
  }

  render() {
    const { newSubmission, errors, styles } = this.state
    const { quests, weapons } = this.props
    return (
      <div className="submission-form--container">
        <form className="submission-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Name"
              value={newSubmission.name}
              onChange={this.handleChange.bind(this, "name")}
            />
            <div>
              {errors.name.map((error, i) =>
                <div key={i}>{error.message}</div>
              )}
            </div>
          </div>
          <SearchSelectionInput items={quests} selectItem={this.selectItem} item="quest" />
          <SelectTimeInput setTime={this.setTime} />
          <SearchSelectionInput items={weapons} selectItem={this.selectItem} item="weapon" />
          <div className="form-group">
            <select
              name="style"
              className="form-control"
              onChange={this.handleChange.bind(this, "style")}
            >
              {styles.map(style => <option key={style} value={style}>{style}</option>)}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  quests: state.quest.quests,
  weapons: state.weapon.weapons,
})

const mapDispatchToProps = dispatch => ({
  saveSubmission(newSubmission, armorSet) {
    dispatch(saveSubmission({
      newSubmission,
      armorSet
    }))
  },
  updateSubmissionForm(newSubmission) {
    dispatch(updateSubmissionForm(newSubmission))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm)