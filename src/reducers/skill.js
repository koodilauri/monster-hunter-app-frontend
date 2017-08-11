const initialState = {
  skills: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_SKILL_SUCCESS":
      return Object.assign({}, state, {
        skills: action.payload.skills
      })
    default:
      return state
  }
}