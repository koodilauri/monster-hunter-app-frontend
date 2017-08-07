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
    errors: {
      name: [],
      quest: [],
      weapon: [],
      minutes: [],
      seconds: [],
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
      this.props.onSubmit(this.state.newSubmission)
    }
  }

  handleChange(field, e) {
    const newValue = e.target.value
    let stateChange = Object.assign({}, this.state)
    stateChange.newSubmission[field] = newValue
    stateChange.errors[field] = this.validateInput(field, newValue)
    this.setState(stateChange)
    this.props.updateSubmissionForm(stateChange.newSubmission)
  }

  selectItem = (field, item) => {
    console.log("valittu item ", field)
    let stateChange = Object.assign({}, this.state)
    stateChange.newSubmission[field] = item
    stateChange.errors[field] = this.validateInput(field, item)    
    this.setState(stateChange)
    this.props.updateSubmissionForm(stateChange.newSubmission)
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
              { errors.name.map((error, i) =>
                <div key={i}>{error.message}</div>
              )}
            </div>
          </div>
          <SearchSelectionInput item="quest" items={quests} selectItem={this.selectItem} errors={errors.quest}/>
          <SelectTimeInput setTime={this.setTime} />
          <SearchSelectionInput item="weapon" items={weapons} selectItem={this.selectItem} errors={errors.weapon}/>
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
            <button type="submit" className="btn btn-primary">Submit</button>
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
  saveSubmission(newSubmission, armorSet, styleAndArts) {
    dispatch(saveSubmission({
      newSubmission,
      armorSet,
      styleAndArts
    }))
  },
  updateSubmissionForm(newSubmission) {
    dispatch(updateSubmissionForm(newSubmission))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm)