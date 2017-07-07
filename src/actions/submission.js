export const GET_SUBMISSION = 'GET_SUBMISSION'
export const POST_SUBMISSION = 'POST_SUBMISSION'

export const getSubmissions = () => {
  return {
    payload: {
      request: {
        method: 'GET',
        url: '/submission'
      }
    },
    type: GET_SUBMISSION
  }
}

export const saveSubmission = (submission) => {
  return {
    payload: {
      request: {
        method: 'POST',
        url: '/submission',
        data: submission
      }
    },
    type: POST_SUBMISSION
  }
}
