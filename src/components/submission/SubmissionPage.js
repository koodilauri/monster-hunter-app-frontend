import React, { Component } from "react"
import { connect } from "react-redux"

import { getQuests } from "../../actions/quest"
import { getArmors } from "../../actions/armor"
import { getHunterArts } from "../../actions/hunterArt"
import { getSkills } from "../../actions/skill"
import { getWeapons } from "../../actions/weapon"
import { getDecorations } from "../../actions/decoration"
import { getSubmissions } from "../../actions/submission"

import StyleAndArts from "./StyleAndArts"
import ArmorSetForm from "./ArmorSetForm"
import SubmissionForm from "./SubmissionForm"
import SubmissionList from "./SubmissionList"

import "./SubmissionPage.css"

class SubmissionPage extends Component {

  componentDidMount() {
    this.props.getAll()
  }

  render() {
    return (
      <div>
        <div className="flex-row">
          <StyleAndArts />
          <ArmorSetForm />
        </div>
        <SubmissionForm />
        <SubmissionList />
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  getAll() {
    dispatch(getQuests())
    dispatch(getSubmissions())
    dispatch(getArmors())
    dispatch(getHunterArts())
    dispatch(getSkills())
    dispatch(getWeapons())
    dispatch(getDecorations())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage)