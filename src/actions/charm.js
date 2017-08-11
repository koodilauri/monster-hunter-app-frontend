export const GET_CHARM = "GET_CHARM"

export const getCharms = () => {
  return {
    payload: {
      request: {
        method: "GET",
        url: "/charm"
      }
    },
    type: GET_CHARM
  }
}