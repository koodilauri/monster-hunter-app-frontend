export const SAVE_ARMORSETFORM = "SAVE_ARMORSETFORM"

export const saveArmorSetForm = (armorSet) => {
  return {
    payload:armorSet,
    type: SAVE_ARMORSETFORM
  }
}