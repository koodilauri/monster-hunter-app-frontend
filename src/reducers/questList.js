const initialState = {
  questList: []
}

export const questList = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_QUESTLIST_SUCCESS':
      return Object.assign({}, state, {
        questList: action.payload.items
      })
    default:
      return state
  }
}