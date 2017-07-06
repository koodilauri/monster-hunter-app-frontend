export const GET_SUBMISSION = 'GET_SUBMISSION'

const getSubmission = (stuff) => {
  return {
    payload: stuff,
    type: GET_SUBMISSION
  }
}

export default getSubmission