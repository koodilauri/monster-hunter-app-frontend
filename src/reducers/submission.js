const initialState = {
  submissions: []
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
        ]
      })
    default:
      return state
  }
}


