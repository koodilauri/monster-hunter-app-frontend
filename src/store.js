import { submission } from './reducers/submission'
import { quest } from './reducers/quest'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { handleRequest } from './middlewares/api'

const store = createStore(combineReducers({ submission, quest }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(handleRequest))

export default store