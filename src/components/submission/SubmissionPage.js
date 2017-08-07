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

import inspector from "schema-inspector"
import { validations as styleAndArtsSchema } from "./styleAndArts.schema"
import { validations as armorSetSchema } from "./armorset.schema"
import { validations as submissionSchema } from "./submission.schema"
// import "./SubmissionPage.css"

class SubmissionPage extends Component {

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
  validateInput(field, value, schema) {
    const validation = schema.properties[field]
    const result = inspector.validate(validation, value)
    return result.error
  }
  validateForm(form, schema) {
    let valid = true
    const newErrors = Object.keys(this.state[form]).reduce((accumulated, key) => {
      const value = this.state[form][key]
      const errors = this.validateInput(key, value, schema)
      if (errors.length > 0) valid = false
      accumulated[key] = errors
      return accumulated
    }, {})
    return { valid, errors: newErrors }
  }

  validateForms() {
    // TODO tässä validoi formit
  }

  handleSubmit = () => {
    const result = this.validateForms()
    if (result.valid) {
      const { newSubmission, armorSet, styleAndArts } = this.props
      this.props.saveSubmission(newSubmission, armorSet, styleAndArts)
    }
  }

  render() {
    return (
      <div>
        <div className="flex-row">
          <StyleAndArts />
          <ArmorSetForm />
        </div>
        <SubmissionForm onSubmit={this.handleSubmit} />
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