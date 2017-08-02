import { initialValues } from "../components/submission/armorset.schema"

export const armorSetForm = (state = initialValues, action) => {
  switch (action.type) {
    case "SAVE_ARMORSETFORM":
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}