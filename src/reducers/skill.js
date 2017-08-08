const initialState = {
  skills: []
}

const skill = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SKILL_SUCCESS":
      return Object.assign({}, state, {
        skills: action.payload.skills
      })
    default:
      return state
  }
}

export default skill