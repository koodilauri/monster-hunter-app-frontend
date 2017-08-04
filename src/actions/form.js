export const FORM_UPDATE_ARMORSET = "FORM_UPDATE_ARMORSET"
export const FORM_UPDATE_SUBMISSION = "FORM_UPDATE_SUBMISSION"
export const FORM_UPDATE_STYLE_AND_ARTS = "FORM_UPDATE_STYLE_AND_ARTS"

export const updateArmorSetForm = (armorSet) => {
  return {
    payload:armorSet,
    type: FORM_UPDATE_ARMORSET
  }
}

export const updateSubmissionForm = (newSubmission) => {
  return {
    payload: newSubmission,
    type: FORM_UPDATE_SUBMISSION
  }
}

export const updateStyleAndArts = (state) => {
  return{
    payload: state,
    type: FORM_UPDATE_STYLE_AND_ARTS
  }
}