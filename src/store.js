import { submissions } from './reducers/submission'
import { questList } from './reducers/questList'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { handleRequest } from './middlewares/api'

const store = createStore(combineReducers({ submissions, questList }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(handleRequest))

export default store