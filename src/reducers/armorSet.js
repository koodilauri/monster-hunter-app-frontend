const initialState = {
  armorSets: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARMOR_SET_SUCCESS":
      return Object.assign({}, state, {
        armorSets: action.payload.armorSets
      })
    default:
      return state
  }
}