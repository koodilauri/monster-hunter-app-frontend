import React, { Component } from "react"
import { connect } from "react-redux"

import { getQuests } from "../../actions/quest"
import { getArmors } from "../../actions/armor"
import { getHunterArts } from "../../actions/hunterArt"
import { getSkills } from "../../actions/skill"
import { getWeapons } from "../../actions/weapon"
import { getDecorations } from "../../actions/decoration"
import { getSubmissions, saveSubmission } from "../../actions/submission"
import { validateForm } from "../../actions/form"

import StyleAndArts from "./StyleAndArts"
import ArmorSetForm from "./ArmorSetForm"
import SubmissionForm from "./SubmissionForm"
import SubmissionList from "./SubmissionList"

// import "./SubmissionPage.css"

class SubmissionPage extends Component {

  componentDidMount() {
    this.props.getAll()
  }

  componentDidUpdate(prevProps, prevState) {
    const { submissionForm, armorSetForm, styleAndArtsForm } = this.props
    if (prevProps !== this.props && submissionForm.valid && armorSetForm.valid && styleAndArtsForm.valid) {
      console.log("props changed and all valid")
    }
  }

  validateForms() {
    // TODO tässä validoi formit
    this.props.validateForm("submission")
    this.props.validateForm("armorSet")
    this.props.validateForm("styleAndArts")
    return {
      valid: false
    }
  }

  handleSubmit = () => {
    const { submissionForm, armorSetForm, styleAndArtsForm } = this.props
    const result = this.validateForms()
    if (submissionForm.valid && armorSetForm.valid && styleAndArtsForm.valid) {
      console.log("valid", result)
      this.props.saveSubmission(submissionForm.values,
        armorSetForm.values,
        styleAndArtsForm.values)
    }
  }

  render() {
    return (
      <div>
        <div className="flex-row">
          <StyleAndArts />
          <ArmorSetForm />
        </div>
        <SubmissionForm submit={this.handleSubmit} />
        <SubmissionList />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submissionForm: state.form.submission,
  armorSetForm: state.form.armorSet,
  styleAndArtsForm: state.form.styleAndArts
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
  },
  validateForm(form) {
    dispatch(validateForm(form))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage)