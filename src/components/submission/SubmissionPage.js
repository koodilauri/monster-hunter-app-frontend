import React, { Component } from "react"
import { connect } from "react-redux"

import { getQuests } from "../../actions/quest"
import { getArmors } from "../../actions/armor"
import { getHunterArts } from "../../actions/hunterArt"
import { getSkills } from "../../actions/skill"
import { getWeapons } from "../../actions/weapon"
import { getDecorations } from "../../actions/decoration"
import { getSubmissions, saveSubmission } from "../../actions/submission"

import StyleAndArts from "./StyleAndArts"
import ArmorSetForm from "./ArmorSetForm"
import SubmissionForm from "./SubmissionForm"
import SubmissionList from "./SubmissionList"

// import "./SubmissionPage.css"

class SubmissionPage extends Component {
  state = {
    newSubmission: {},
    armorSet: {},
    styleAndArts: {}
  }

  componentDidMount() {
    this.props.getAll()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        newSubmission: this.props.newSubmission,
        armorSet: this.props.armorSet,
        styleAndArts: this.props.styleAndArts
      })
    }
  }
  
  handleSubmit = (e) => {
    const {newSubmission, armorSet, styleAndArts} = this.state
    e.preventDefault()
    this.props.saveSubmission(newSubmission, armorSet, styleAndArts)
  }

  render() {
    return (
      <div>
        <div className="flex-row">
          <StyleAndArts />
          <ArmorSetForm />
        </div>
        <SubmissionForm />
        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>

        <SubmissionList />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newSubmission: state.form.newSubmission,
  armorSet: state.form.armorSet,
  styleAndArts: state.form.styleAndArts
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
  },
  saveSubmission(newSubmission, armorSet, styleAndArts) {
    dispatch(saveSubmission({
      newSubmission,
      armorSet,
      styleAndArts
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage)