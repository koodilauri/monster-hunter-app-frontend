export const GET_QUESTLIST = 'GET_QUESTLIST'

export const getQuestList = (search) => {
  return {
    payload: { request: { method: 'GET', url: '/questlist?q='+search+'&language=javascript' }},
    type: GET_QUESTLIST
  }
}