const initialState = {
  armors: []
}

export const armor = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARMOR_SUCCESS":
      return Object.assign({}, state, {
        armors: action.payload.armor
      })
    default:
      return state
  }
}