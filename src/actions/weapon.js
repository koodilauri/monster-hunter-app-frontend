export const GET_WEAPON = 'GET_WEAPON'

export const getWeapons = () => {
  return {
    payload: {
      request: {
        method: 'GET',
        url: '/weapon'
      }
    },
    type: GET_WEAPON
  }
}