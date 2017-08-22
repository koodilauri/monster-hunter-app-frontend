
// import inspector from "schema-inspector"
// import { validations } from "../schemas"

// import {
//   FORM_UPDATE_FIELD,
//   FORM_VALIDATE,
//   updateFormFieldWithErrors,
//   updateFormErrors,
// } from "../actions/form"

// const validateInput = (form, field, value) => {
//   const validation = validations[form].properties[field]
//   const result = inspector.validate(validation, value)
//   return result.error
// }

// export const validateFormUpdate = (action, store) => {
//   const { form, field, value } = action.payload
//   const errors = validateInput(form, field, value)
//   const newAction = updateFormFieldWithErrors(form, field, value, errors)
//   store.dispatch(newAction)
//   return newAction
// }

// export const validateFormFields = (form) => {
//   const { values } = form
//   let valid = true
//   const newErrors = Object.keys(values).reduce((accumulated, key) => {
//     const value = values[key]
//     const errors = validateInput(form, key, value)
//     if (errors.length > 0) valid = false
//     accumulated[key] = errors
//     return accumulated
//   }, {})

//   const newAction = updateFormErrors(form, newErrors, valid)
//   store.dispatch(newAction)
//   return newAction
// }

// export const handleFormUpdate = store => next => action => {
//   if (action.type === FORM_UPDATE_FIELD) {
//     return validateFormUpdate(action, store)
//   } else if (action.type === FORM_VALIDATE) {
//     return validateFormFields(action, store)
//   } else {
//     next(action)
//   }
// }