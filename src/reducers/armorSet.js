const initialState = {
  armorSets: [],
  setDecorations: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARMOR_SET_SUCCESS":
      return Object.assign({}, state, {
        armorSets: action.payload.armorSets,
        setDecorations: action.payload.setDecorations
      })
    default:
      return state
  }
}