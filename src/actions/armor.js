export const GET_ARMOR = 'GET_ARMOR'

export const getArmors = () => {
  return {
    payload: {
      request: {
        method: 'GET',
        url: '/armor'
      }
    },
    type: GET_ARMOR
  }
}