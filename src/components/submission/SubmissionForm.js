import React, { Component } from "react"
import { connect } from "react-redux"
import { getQuests } from "../../actions/quest"
import { saveSubmission } from "../../actions/submission"

import SearchSelectionInput from "../ui/SearchSelectionInput"
import SelectTimeInput from "../ui/SelectTimeInput"

import inspector from "schema-inspector"
import { initialValues, validations } from "./submission.schema"

class SubmissionForm extends Component {

  state = {
    newSubmission: initialValues,
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
      accumulated[key] = this.validateInput(key, value)
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
      this.props.saveSubmission(this.state.newSubmission)
    }
    console.log(this.state)
  }

  handleChange(field, e) {
    const newValue = e.target.value
    let stateChange = Object.assign({}, this.state)
    stateChange.newSubmission[field] = newValue
    stateChange.errors[field] = this.validateInput(field, newValue)
    this.setState(stateChange)
  }

  selectItem = (type, item) => {
    console.log("valittu item ", type)
    let stateChange = Object.assign({}, this.state.newSubmission)
    stateChange[type] = item
    this.setState({ newSubmission: stateChange })
  }

  setTime = (unit, amount) => {
    console.log("aika asetettu " + unit + " " + amount)
    let stateChange = Object.assign({}, this.state.newSubmission)
    stateChange[unit] = amount
    this.setState({ newSubmission: stateChange })
  }

  render() {
    const { newSubmission, errors, styles } = this.state
    const { quests, weapons } = this.props
    return (
      <div className="container submission-form--container">
        <div className="col-md-12">
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="submission-form--body row">
              <div className="form-group child">
                <input
                  name="name"
                  type="text"
                  className="submission-form--input submission-form--input__name"
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
              <div className="form-group child">
                <select
                  name="style"
                  className="submission-form--select"
                  onChange={this.handleChange.bind(this, "style")}
                >
                  {styles.map(style => <option key={style} value={style}>{style}</option>)}
                </select>
              </div>
              <div className="form-group child">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  quests: state.quest.quests,
  weapons: state.weapon.weapons,
})

const mapDispatchToProps = dispatch => ({
  getQuests() {
    dispatch(getQuests())
  },
  saveSubmission(newSubmission, armorSet) {
    dispatch(saveSubmission({
      newSubmission,
      armorSet
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm)