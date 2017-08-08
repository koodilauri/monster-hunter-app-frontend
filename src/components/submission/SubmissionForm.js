import React, { Component } from "react"
import { connect } from "react-redux"

import { updateFormField, validateForm } from "../../actions/form"

import SearchSelectionInput from "../ui/SearchSelectionInput"
import SelectTimeInput from "../ui/SelectTimeInput"

// import inspector from "schema-inspector"
// import { initialValues, validations } from "./submission.schema"

class SubmissionForm extends Component {

  state = {
    styles: ["Guild", "Striker", "Adept", "Aerial"]
  }

  // validateInput(field, value) {
  //   const validation = validations.properties[field]
  //   const result = inspector.validate(validation, value)
  //   return result.error
  // }

  // validateForm() {
  //   let valid = true
  //   const newErrors = Object.keys(this.state.newSubmission).reduce((accumulated, key) => {
  //     const value = this.state.newSubmission[key]
  //     const errors = this.validateInput(key, value)
  //     if (errors.length > 0) valid = false
  //     accumulated[key] = errors
  //     return accumulated
  //   }, {})
  //   return { valid, errors: newErrors }
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.props.validateForm("submission")
    this.props.validateForm("armorSet")
    this.props.validateForm("styleAndArts")
    const { submissionForm, armorSetForm, styleAndArtsForm } = this.props
    if (submissionForm.valid && armorSetForm.valid && styleAndArtsForm.valid) {
      this.props.onSubmit()
    }
  }

  handleChange(field, e) {
    // const newValue = e.target.value
    // let stateChange = Object.assign({}, this.state)
    // stateChange.newSubmission[field] = newValue
    // stateChange.errors[field] = this.validateInput(field, newValue)
    // this.setState(stateChange)
    // this.props.updateSubmissionForm(stateChange.newSubmission)
    this.props.updateFormField("submission", field, e.target.value)
  }

  selectItem = (field, item) => {
    // console.log("valittu item ", field)
    // let stateChange = Object.assign({}, this.state)
    // stateChange.newSubmission[field] = item
    // stateChange.errors[field] = this.validateInput(field, item)    
    // this.setState(stateChange)
    // this.props.updateSubmissionForm(stateChange.newSubmission)
    this.props.updateFormField("submission", field, item)
  }

  setTime = (unit, amount) => {
    // console.log("aika asetettu " + unit + " " + amount)
    // let stateChange = Object.assign({}, this.state.newSubmission)
    // stateChange[unit] = amount
    // this.setState({ newSubmission: stateChange })
    // this.props.updateSubmissionForm(stateChange)
    this.props.updateFormField("submission", unit, amount)
  }

  render() {
    const { styles } = this.state
    const { submissionForm, quests, weapons } = this.props
    const errors = submissionForm.errors
    console.log(submissionForm)
    return (
      <div className="submission-form--container">
        <form className="submission-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Name"
              value={submissionForm.name}
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
  submissionForm: state.form.submission,
  armorSetForm: state.form.armorSet,
  styleAndArtsForm: state.form.styleAndArts,
  quests: state.quest.quests,
  weapons: state.weapon.weapons,
})

const mapDispatchToProps = dispatch => ({
  updateFormField(form, field, value) {
    dispatch(updateFormField(form, field, value))
  },
  validateForm(form) {
    dispatch(validateForm(form))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm)