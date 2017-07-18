export const GET_SKILL = 'GET_SKILL'

export const getSkills = () => {
  return {
    payload: {
      request: {
        method: 'GET',
        url: '/skill'
      }
    },
    type: GET_SKILL
  }
}