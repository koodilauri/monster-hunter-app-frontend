const initialState = {
  armors: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARMOR_SUCCESS":
      return Object.assign({}, state, {
        armors: action.payload.armor
      })
    default:
      return state
  }
}