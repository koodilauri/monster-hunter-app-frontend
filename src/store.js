import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()

function configureStore() {
  return createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
  )  
}
const store = configureStore()

sagaMiddleware.run(rootSaga)

export default store