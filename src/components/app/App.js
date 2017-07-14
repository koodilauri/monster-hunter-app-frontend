import React, { Component } from "react"
import "./App.css"
import SubmissionForm from "../submission/SubmissionForm"
import { getQuests } from "../../actions/quest"
import { connect } from "react-redux"

class App extends Component {

  componentDidMount() {
    this.props.findQuests()
  }

  render() {
    return (
      <div className="App">
        <div><h1 className="h1 App__h1">Hunters log</h1></div>
        <SubmissionForm quests={this.props.quests} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  quests: state.quest.quests
})

const mapDispatchToProps = dispatch => ({
  findQuests() {
    dispatch(getQuests())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)