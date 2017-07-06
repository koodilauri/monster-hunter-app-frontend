const initialState = {
  submission: []
}

const submission = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SUBMISSION':
      return Object.assign({}, state, {
        submission: action.payload
      })
    default:
      return state
  }
}



export default submission