import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Routes from "./routes"
import { Provider } from "react-redux"
import store from "./store"

// import 'custom-bootstrap/build/index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import "./components/submission/SubmissionForm.css"

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
)