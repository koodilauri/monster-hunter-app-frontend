
import {
  FORM_UPDATE_FIELD_WITH_ERRORS,
  FORM_UPDATE_ERRORS,
} from "../actions/form"

import { initialValues } from "../schemas"

const INITIAL_STATE = {
  submission: {
    values: initialValues.submission,
    errors: {
      name: [],
      quest: [],
      weapon: [],
      minutes: [],
      seconds: [],
    },
    valid: false,
  },
  armorSet: {
    values: initialValues.armorSet,
    errors: {},
    valid: false,
  },
  styleAndArts: {
    values: initialValues.styleAndArts,
    errors: {},
    valid: false,
  }
}

export default (state = INITIAL_STATE, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case FORM_UPDATE_FIELD_WITH_ERRORS:
      newState[action.payload.form].values[action.payload.field] = action.payload.value
      newState[action.payload.form].errors[action.payload.field] = action.payload.errors
      return newState
    case FORM_UPDATE_ERRORS:
      newState[action.payload.form].errors = action.payload.newErrors
      newState[action.payload.form].valid = action.payload.valid
      return newState
    default:
      return state
  }
}