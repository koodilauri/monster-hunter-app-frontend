const initialState = {
  submission: []
}

export const submission = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SUBMISSION_SUCCESS':
      return Object.assign({}, state, {
        submission: action.payload
      })
    default:
      return state
  }
}


