import axios from "axios";

const callApi = (action, store) => {
  // dispatches first e.g. LOGIN_USER_REQUEST type of action
  // so that state can block extra requests / set a loading bar or something
  store.dispatch({
    type: action.type + "_REQUEST",
  });

  const request = action.payload.request;

  return axios({
      method: request.method,
      url: process.env.REACT_APP_API_URL + request.url,
      data: request.data,
      headers: {
        "Accept": "application/json",
      },
    })
    .then(res => {
      const newAction = {
        type: action.type + "_SUCCESS",
        payload: res.data,
      }
      store.dispatch(newAction);
      return newAction;
    })
    .catch(err => {
      const newAction = {
        type: action.type + "_FAIL",
        payload: err,
      }
      // store.dispatch(newAction);
      return newAction;
    });
};

export const handleRequest = store => next => action => {
  next(action);
  if (action.payload && action.payload.request) {
    return callApi(action, store);
  }
};