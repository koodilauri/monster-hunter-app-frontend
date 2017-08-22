const initialState = {
  charms:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CHARM_SUCCESS":
      return Object.assign({}, state, {
        charms: action.payload.charms
      })
    default:
      return state
  }
}