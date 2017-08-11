const initialState = {
  decorations: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_DECORATION_SUCCESS":
      return Object.assign({}, state, {
        decorations: action.payload.decorations
      })
    default:
      return state
  }
}