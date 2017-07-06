import reducer from './reducers/submission'
import { createStore } from 'redux'

const store = createStore(reducer);

export default store