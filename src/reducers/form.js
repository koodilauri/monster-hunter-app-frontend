
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
      minutes: [],
      seconds: [],
    },
    valid: false,
  },
  armorSet: {
    values: initialValues.armorSet,
    errors: {
      setName: []
    },
    valid: false,
  },
  styleAndArts: {
    values: initialValues.styleAndArts,
    errors: {
      selectedStyle: [],
      selectedHunterArts: []
    },
    valid: false,
  },
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_UPDATE_FIELD_WITH_ERRORS:
      return updateFormField(state, action)
    case FORM_UPDATE_ERRORS:
      return updateForm(state, action)
    default:
      return state
  }
}

const updateFormField = (state, action) => {
  const { form, field, value, errors } = action.payload
  return Object.assign({}, state, {
    [form]: {
      values: Object.assign({}, state[form].values, { [field]: value }),
      errors: Object.assign({}, state[form].errors, { [field]: errors }),
      valid: state[form].valid,
    }
  })
}

const updateForm = (state, action) => {
  const { form, errors, valid } = action.payload
  return Object.assign({}, state, {
    [form]: {
      values: state[form].values,
      errors,
      valid,
    }
  })
}
