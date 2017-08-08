const initialState = {
  hunterArts: []
}

const hunterArt = (state = initialState, action) => {
  switch (action.type) {
    case "GET_HUNTER_ART_SUCCESS":
      return Object.assign({}, state, {
        hunterArts: action.payload.arts
      })
    default:
      return state
  }
}

export default hunterArt