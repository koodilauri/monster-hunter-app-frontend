
import {
  initialValues as submissionValues,
  validations as submissionValidations,
} from "./submission.schema"
import {
  initialValues as armorSetValues,
  validations as armorSetValidations,
} from "./armorSet.schema"
import {
  initialValues as styleAndArtsValues,
  validations as styleAndArtsValidations,
} from "./styleAndArts.schema"

export const initialValues = {
  submission: submissionValues,
  armorSet: armorSetValues,
  styleAndArts: styleAndArtsValues,
}

export const validations = {
  submission: submissionValidations,
  armorSet: armorSetValidations,
  styleAndArts: styleAndArtsValidations,
  exec(schema, values) {
    if (values.minutes === 0 && values.seconds === 0) {
      this.report("Time can't be 00:00")
    }
  }
}