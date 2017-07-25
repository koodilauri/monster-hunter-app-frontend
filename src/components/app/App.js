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

// import "./App.css"

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
        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button type="btn btn-primary" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Hunters log</a>
            </div>
          </div>
        </nav>
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