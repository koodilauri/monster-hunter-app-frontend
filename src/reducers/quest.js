const initialState = {
  quest: []
}

export const quest = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_QUEST_SUCCESS':
      return Object.assign({}, state, {
        quest: action.payload.items
      })
    default:
      return state
  }
}