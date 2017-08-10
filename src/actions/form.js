
import inspector from "schema-inspector"
import { validations } from "../schemas"

const validateInput = (form, field, value) => {
  const validation = validations[form].properties[field]
  const result = inspector.validate(validation, value)
  return result.error
}

const validateFormFields = (form, values) => {
  let valid = true
  const errors = Object.keys(values).reduce((accumulated, key) => {
    const value = values[key]
    const fieldErrors = validateInput(form, key, value)
    if (fieldErrors.length > 0) valid = false
    accumulated[key] = fieldErrors
    return accumulated
  }, {})
  
  return {
    errors,
    valid,
  }
}

export const FORM_UPDATE_FIELD_WITH_ERRORS = "FORM_UPDATE_FIELD_WITH_ERRORS"
export const FORM_UPDATE_ERRORS = "FORM_UPDATE_ERRORS"

/**
 * Action creators called by components
 */

export const updateFormField = (form, field, value) => {
  const errors = validateInput(form, field, value)
  return {
    type: FORM_UPDATE_FIELD_WITH_ERRORS,
    payload: {
      form,
      field,
      value,
      errors,
    }
  }
}

export const validateForm = (form, values) => {
  const { errors, valid } = validateFormFields(form, values)
  return {
    type: FORM_UPDATE_ERRORS,
    payload: {
      form,
      errors,
      valid,
    }
  }
}