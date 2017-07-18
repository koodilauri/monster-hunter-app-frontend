export const GET_DECORATION = 'GET_DECORATION'

export const getDecorations = () => {
  return {
    payload: {
      request: {
        method: 'GET',
        url: '/decoration'
      }
    },
    type: GET_DECORATION
  }
}