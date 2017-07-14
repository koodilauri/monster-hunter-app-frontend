export const GET_QUEST = 'GET_QUEST'

export const getQuests = () => {
  return {
    payload: {
      request: {
        method: 'GET',
        url: '/quest'
      }
    },
    type: GET_QUEST
  }
}