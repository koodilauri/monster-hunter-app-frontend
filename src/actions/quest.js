export const GET_QUEST = 'GET_QUEST'

export const getQuests = () => {
  return {
    payload: { request: { method: 'GET', url: '/questlist' } },
    type: GET_QUEST
  }
}