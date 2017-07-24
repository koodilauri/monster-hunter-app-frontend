import React, { Component } from "react"
import "./App.css"
import SubmissionForm from "../submission/SubmissionForm"
import { getQuests } from "../../actions/quest"
import { getArmor } from "../../actions/armor"
import { getHunterArts } from "../../actions/hunterArt"
import { getSkills } from "../../actions/skill"
import { getWeapons } from "../../actions/weapon"
import { getDecorations } from "../../actions/decoration"
import { getSubmissions, saveSubmission } from "../../actions/submission"
import { connect } from "react-redux"

class App extends Component {

  componentDidMount() {
    this.props.findSubmissions()
    this.props.findQuests()
    this.props.findArmor()
    this.props.findHunterArts()
    this.props.findSkills()
    this.props.findWeapons()
    this.props.findDecorations()
  }

  render() {
    return (
      <div className="App">
        <div><h1 className="h1 App__h1">Hunters log</h1></div>
        <SubmissionForm quests={this.props.quests} submissions={this.props.submissions} submitSubmission={this.props.submitSubmission}
          armor={this.props.armor} weapons={this.props.weapons} skills={this.props.skills} hunterArts={this.props.hunterArts}
          decorations={this.props.decorations} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  quests: state.quest.quests,
  submissions: state.submission.submissions,
  armor: state.armor.armor,
  hunterArts: state.hunterArt.hunterArts,
  skills: state.skill.skills,
  weapons: state.weapon.weapons,
  decorations: state.decoration.decorations
})

const mapDispatchToProps = dispatch => ({
  findQuests() {
    dispatch(getQuests())
  },
  findSubmissions() {
    dispatch(getSubmissions())
  },
  submitSubmission(newSubmission, armorSet) {
    dispatch(saveSubmission({
      newSubmission,
      armorSet
    }))
  },
  findArmor() {
    dispatch(getArmor())
  },
  findHunterArts() {
    dispatch(getHunterArts())
  },
  findSkills() {
    dispatch(getSkills())
  },
  findWeapons() {
    dispatch(getWeapons())
  },
  findDecorations() {
    dispatch(getDecorations())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)