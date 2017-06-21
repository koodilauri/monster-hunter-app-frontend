import React from "react";
import Redux from "redux";
import reducer from './reducers/submission'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/app/App'

let store = createStore(reducer);

export default store