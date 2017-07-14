import React, { Component } from "react"
import "./App.css"
import SubmissionForm from "../submission/SubmissionForm"
import { getQuests } from "../../actions/quest"
import { getSubmissions, saveSubmission } from "../../actions/submission"
import { connect } from "react-redux"

class App extends Component {

  componentDidMount() {
    this.props.findSubmissions()
    this.props.findQuests()
  }

  render() {
    return (
      <div className="App">
        <div><h1 className="h1 App__h1">Hunters log</h1></div>
        <SubmissionForm quests={this.props.quests} submissions={this.props.submissions} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  quests: state.quest.quests,
  submissions: state.submission.submissions
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)