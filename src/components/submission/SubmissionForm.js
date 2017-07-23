import React, { Component } from "react"
import { connect } from "react-redux"
import { getQuests } from "../../actions/quest"
import { saveSubmission } from "../../actions/submission"

import SearchSelectionInput from "../ui/SearchSelectionInput"
import SelectTimeInput from "../ui/SelectTimeInput"

import inspector from "schema-inspector"
import { initialValues, validations } from "./submission.schema"

import "./SubmissionForm.css"

class SubmissionForm extends Component {

  state = {
    newSubmission: initialValues,
    selectedQuest: {},
    selectedWeapon: {},
    styles: ["Guild", "Striker", "Adept", "Aerial"]
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.newSubmission)
  }

  handleChange(field, e) {
    let stateChange = Object.assign({}, this.state.newSubmission)
    stateChange[field] = e.target.value
    this.setState({ newSubmission: stateChange })
    // const validation = validations.properties[field]
    // const result = inspector.validate(validation, e.target.value)
    // let stateChange = Object.assign({}, this.state)
    // stateChange[field] = e.target.value
    // stateChange.errors[field] = result.error
    // this.setState(stateChange)
  }

  selectQuest = (quest) => {
    console.log("valittu quest", quest)
    this.setState({
      selectedQuest: quest
    })
  }

  selectWeapon = (weapon) => {
    console.log("valittu weapon", weapon)
    this.setState({
      selectedWeapon: weapon
    })
  }

  setTime(unit, amount) {
    console.log("aika asetettu " + unit + " " + amount)
    let stateChange = Object.assign({}, this.state.newSubmission)
    stateChange[unit] = amount
    this.setState({ newSubmission: stateChange })
  }

  render() {
    const { newSubmission, styles } = this.state
    const { quests, weapons } = this.props
    return (
      <form className="submission-form--container" onSubmit={this.handleSubmit}>
        <div className="submission-form--body">
          <div>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={newSubmission.name}
              onChange={this.handleChange.bind(this, "name")}
            />
          </div>
          <SearchSelectionInput items={quests} selectItem={this.selectQuest}/>
          <SelectTimeInput setTime={this.setTime}/>
          <SearchSelectionInput items={weapons} selectItem={this.selectWeapon}/>
          <div>
            <select
              name="style"
              onChange={this.handleChange.bind(this, "style")}
            >
              { styles.map(style => <option key={style} value={style}>{style}</option>)}
            </select>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
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
  submitSubmission(newSubmission, armorSet) {
    dispatch(saveSubmission({
      newSubmission,
      armorSet
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm)