import { initialValues as armorSet } from "../components/submission/armorset.schema"
import { initialValues as newSubmission } from "../components/submission/submission.schema"
import { initialValues as styleAndArts } from "../components/submission/styleAndArts.schema"
const initialState = {
  newSubmission,
  armorSet,
  styleAndArts
}

const form = (state = initialState, action) => {
  switch (action.type) {
    case "FORM_UPDATE_ARMORSET":
      return Object.assign({}, state, { armorSet: Object.assign({}, state.armorSet, action.payload) })
    case "FORM_UPDATE_SUBMISSION":
      return Object.assign({}, state, { newSubmission: action.payload })
    case "FORM_UPDATE_STYLE_AND_ARTS":
      return Object.assign({}, state, { styleAndArts: Object.assign({}, state.styleAndArts, action.payload) })
    default:
      return state
  }
}

export default form