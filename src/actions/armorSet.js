export const GET_ARMOR_SET = "GET_ARMOR_SET"

export const getArmorSets = () => {
  return {
    payload: {
      request: {
        method: "GET",
        url: "/armorset"
      }
    },
    type: GET_ARMOR_SET
  }
}