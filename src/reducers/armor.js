const initialState = {
  armors: []
}

const armor = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARMOR_SUCCESS":
      return Object.assign({}, state, {
        armors: action.payload.armor
      })
    default:
      return state
  }
}

export default armor