import { initialValues as armorset } from "../components/submission/armorset.schema"
import { initialValues as submission } from "../components/submission/submission.schema"
const styleAndArts = {
  selectedStyle: "",
  selectedHunterArts: []
}

export const form = (state = { submission, armorset, styleAndArts }, action) => {
  switch (action.type) {
    case "FORM_UPDATE_ARMORSET":
      return Object.assign({}, state, { armorset: action.payload })
    case "FORM_UPDATE_SUBMISSION":
      return Object.assign({}, state, { submission: action.payload })
    case "FORM_UPDATE_STYLE_AND_ARTS":
      return Object.assign({}, state, { styleAndArts: Object.assign({}, state.styleAndArts, action.payload) })
    default:
      return state
  }
}