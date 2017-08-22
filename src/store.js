import reducers from "./reducers"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas"

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)

  const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )

  sagaMiddleware.run(rootSaga)

  return store
}


export default configureStore()