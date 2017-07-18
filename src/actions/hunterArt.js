export const GET_HUNTER_ART = 'GET_HUNTER_ART'

export const getHunterArts = () => {
  return {
    payload: {
      request: {
        method: 'GET',
        url: '/hunter-art'
      }
    },
    type: GET_HUNTER_ART
  }
}