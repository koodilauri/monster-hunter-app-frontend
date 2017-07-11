import React, { Component } from 'react'
import './App.css'
import SubmissionForm from "../submission/SubmissionForm"
import { getQuests } from '../../actions/quest'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    this.props.findQuests()
  }

  render() {
    return (
      <div className="App">
        <div><h1 className="h1 h1--mh">Hunters log</h1></div>
        <SubmissionForm quest={this.props.quest} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  quest: state.quest.quest
})

const mapDispatchToProps = dispatch => ({
  findQuests() {
    dispatch(getQuests())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)