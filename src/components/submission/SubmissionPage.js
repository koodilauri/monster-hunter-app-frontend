import React, { Component } from "react"
import { connect } from "react-redux"

import { getQuests } from "../../actions/quest"
import { getArmors } from "../../actions/armor"
import { getHunterArts } from "../../actions/hunterArt"
import { getSkills } from "../../actions/skill"
import { getCharms } from "../../actions/charm"
import { getWeapons } from "../../actions/weapon"
import { getDecorations } from "../../actions/decoration"
import { getSubmissions, saveSubmission } from "../../actions/submission"
import { getArmorSets } from "../../actions/armorSet"
import { validateForm } from "../../actions/form"

import StyleAndArts from "./StyleAndArts"
import ArmorSetForm from "./ArmorSetForm"
import SubmissionForm from "./SubmissionForm"

import "./SubmissionPage.css"

class SubmissionPage extends Component {
  state = {
    shown: {
      styleAndArts: true,
      armorSet: true,
    }
  }

  toggleShown(type, e) {
    this.setState({
      shown: Object.assign({}, this.state.shown, { [type]: !this.state.shown[type] })
    })
  }

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
    new Promise((resolve) => resolve(this.validateForms()))
      .then(() => {
        const { submissionForm, armorSetForm, styleAndArtsForm } = this.props
        if (submissionForm.valid && armorSetForm.valid && styleAndArtsForm.valid) {
          this.props.saveSubmission(submissionForm.values,
            armorSetForm.values,
            styleAndArtsForm.values)
          console.log("forms are valid")
        } else {
          console.log("forms are not valid")
        }
      })
  }

  render() {
    const { shown } = this.state
    return (
      <div>
        {this.props.backendError.message ?
          <div className="alert alert-dismissible alert-danger backend-error-container">
            <strong>{this.props.backendError.message}</strong>
          </div> : null }
        <SubmissionForm submit={this.handleSubmit} />
        <div className="style-and-armor--container">
          <div className="style-and-armor--item">
            <div onClick={this.toggleShown.bind(this, "styleAndArts")}>
              <h3 className="style-and-armor--item__header">Style and Arts
                <span className="m-left">
                  <i className={shown.styleAndArts ? "fa fa-chevron-down" : "fa fa-chevron-up"} 
                    aria-hidden="true"></i>
                </span>
              </h3>
            </div>
            <div className={shown.styleAndArts ? "visible" : "hidden"}>
              <StyleAndArts />
            </div>
          </div>
          <div className="style-and-armor--item">
            <div onClick={this.toggleShown.bind(this, "armorSet")}>
              <h3 className="style-and-armor--item__header">Armor Set
                <span className="m-left">
                  <i className={shown.armorSet ? "fa fa-chevron-down" : "fa fa-chevron-up"} 
                    aria-hidden="true"></i>
                </span>
              </h3>
            </div>
            <div className={shown.armorSet ? "visible" : "hidden"}>
              <ArmorSetForm />
            </div>
          </div>
        </div>
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
    dispatch(getCharms())
    dispatch(getWeapons())
    dispatch(getDecorations())
    dispatch(getArmorSets())
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