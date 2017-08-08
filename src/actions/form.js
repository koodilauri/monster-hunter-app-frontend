
export const FORM_UPDATE_FIELD = "FORM_UPDATE_FIELD"
export const FORM_VALIDATE = "FORM_VALIDATE"

export const FORM_UPDATE_FIELD_WITH_ERRORS = "FORM_UPDATE_FIELD_WITH_ERRORS"
export const FORM_UPDATE_ERRORS = "FORM_UPDATE_ERRORS"


/**
 * Action creators called by components
 */

export const updateFormField = (form, field, value) => ({
  type: FORM_UPDATE_FIELD,
  payload: {
    form,
    field,
    value,
  }
})

export const validateForm = (form) => ({
  type: FORM_VALIDATE,
  payload: {
    form,
  }
})

/**
 * Action creators called by validation-middleware
 */

export const updateFormFieldWithErrors = (form, field, value, errors) => ({
  type: FORM_UPDATE_FIELD_WITH_ERRORS,
  payload: {
    form,
    field,
    value,
    errors,
  }
})

export const updateFormErrors = (form) => ({
  type: FORM_UPDATE_ERRORS,
  payload: {
    form: form.form,
    newErrors: form.newErrors,
    valid: form.valid,
  }
})