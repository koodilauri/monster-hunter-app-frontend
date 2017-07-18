const initialState = {
  armor: []
}

export const armor = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARMOR_SUCCESS":
      return Object.assign({}, state, {
        armor: action.payload.armor
      })
    default:
      return state
  }
}