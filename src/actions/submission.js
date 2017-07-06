export const GET_SUBMISSION = 'GET_SUBMISSION'

export const getSubmissions = () => {
  return {
    payload: { request: { method: 'GET', url: '/submission' }},
    type: GET_SUBMISSION
  }
}
