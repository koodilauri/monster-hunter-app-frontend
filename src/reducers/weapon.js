const initialState = {
  weapons: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_WEAPON_SUCCESS":
      return Object.assign({}, state, {
        weapons: action.payload.weapons
      })
    default:
      return state
  }
}

export default weapon
