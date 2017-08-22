const initialState = {
  skills: [],
  effects:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_SKILL_SUCCESS":
      return Object.assign({}, state, {
        skills: action.payload.skills,
        effects: action.payload.effects
      })
    default:
      return state
  }
}

export default skill
