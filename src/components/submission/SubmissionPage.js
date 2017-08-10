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

  validateForms() {
    // TODO tässä validoi formit
    this.props.validateForm("submission", this.props.submissionForm.values)
    this.props.validateForm("armorSet", this.props.armorSetForm.values)
    this.props.validateForm("styleAndArts", this.props.styleAndArtsForm.values)
  }

  handleSubmit = () => {
    this.validateForms()
    const { submissionForm, armorSetForm, styleAndArtsForm } = this.props
    console.log(this.props)
    if (submissionForm.valid && armorSetForm.valid && styleAndArtsForm.valid) {
      console.log("forms are valid")
      this.props.saveSubmission(submissionForm.values,
        armorSetForm.values,
        styleAndArtsForm.values)
    } else {
      console.log("forms are not valid")
    }
  }

  render() {
    return (
      <div>
        {this.props.backendError.message ? <div className="backend-error-container">{this.props.backendError.message}</div> : <div>{this.props.backendError}</div>}
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
  styleAndArtsForm: state.form.styleAndArts,
  backendError: state.submission.backendError
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
  validateForm(form, values) {
    dispatch(validateForm(form, values))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage)