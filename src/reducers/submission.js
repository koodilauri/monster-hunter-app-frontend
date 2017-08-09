const initialState = {
  submissions: [],
  backendError: ""
}

export const submission = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUBMISSION_SUCCESS":
      return Object.assign({}, state, {
        submissions: action.payload.submissions
      })
    case "POST_SUBMISSION_SUCCESS":
      console.log(action.payload)
      return Object.assign({}, state, {
        submissions: [
          ...state.submissions,
          action.payload.newSubmission
        ],
        backendError:""
      })
    case "POST_SUBMISSION_FAIL":
      return Object.assign({}, state, {
        backendError: action.payload.error
      })
    default:
      return state
  }
}


