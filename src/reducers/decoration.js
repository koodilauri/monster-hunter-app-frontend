const initialState = {
  decorations: []
}

export const decoration = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DECORATION_SUCCESS":
      return Object.assign({}, state, {
        decorations: action.payload.decorations
      })
    default:
      return state
  }
}