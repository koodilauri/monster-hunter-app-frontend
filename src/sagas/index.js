import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import axios from "axios"
import { createRequest } from "../api/index"
// const createRequest = require("../api/index").createRequest

function* callApi(action) {
  yield put({ type: `${action.type}_REQUEST` })
  try {
    const result = yield call(createRequest, action.payload.request)
    yield put({ type: `${action.type}_SUCCESS`, payload: result.data })
  } catch (err) {
    yield put({ type: `${action.type}_FAIL`, payload: err.response })
  }
}

function* handleRequest(action) {
  yield takeLatest((action => action.payload && action.payload.request), callApi)
}

export default function* root() {
  yield all([
    fork(handleRequest)
  ])
}