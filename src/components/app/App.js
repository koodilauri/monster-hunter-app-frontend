import React, { Component } from "react"
import { connect } from "react-redux"

import { getQuests } from "../../actions/quest"
import { getArmor } from "../../actions/armor"
import { getHunterArts } from "../../actions/hunterArt"
import { getSkills } from "../../actions/skill"
import { getWeapons } from "../../actions/weapon"
import { getDecorations } from "../../actions/decoration"
import { getSubmissions } from "../../actions/submission"

import SubmissionForm from "../submission/SubmissionForm"
import SubmissionList from "../submission/SubmissionList"

import "./App.css"

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
        <SubmissionForm />
        <SubmissionList />
      </div>
    )
  }
}
const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  findQuests() {
    dispatch(getQuests())
  },
  findSubmissions() {
    dispatch(getSubmissions())
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