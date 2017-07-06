import { submission } from './reducers/submission'
import { createStore, applyMiddleware } from 'redux'
import {handleRequest} from './middlewares/api'
const store = createStore(submission, [], applyMiddleware(handleRequest));

export default store