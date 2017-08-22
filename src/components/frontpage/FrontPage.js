import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuests } from "../../actions/quest"
import { getArmors } from "../../actions/armor"
import { getHunterArts } from "../../actions/hunterArt"
import { getSkills } from "../../actions/skill"
import { getCharms } from "../../actions/charm"
import { getWeapons } from "../../actions/weapon"
import { getDecorations } from "../../actions/decoration"
import { getSubmissions } from "../../actions/submission"
import { getArmorSets } from "../../actions/armorSet"

import SubmissionList from "../submission/SubmissionList"

import './FrontPage.css'

class FrontPage extends Component {

  componentDidMount() {
    this.props.getAll()
  }

  render() {
    return (
      <div className="FrontPage--container">
        <h1>Submissions</h1>
        <SubmissionList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
  getAll() {
    dispatch(getQuests())
    dispatch(getSubmissions())
    dispatch(getArmors())
    dispatch(getHunterArts())
    dispatch(getSkills())
    dispatch(getCharms())
    dispatch(getWeapons())
    dispatch(getDecorations())
    dispatch(getArmorSets())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
