import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Routes from "./routes"
import { Provider } from "react-redux"
import store from "./store"

// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/css/bootstrap-theme.css"
import "./theme/css/customBootstrap.css"
import "./components/submission/SubmissionForm.css"
import "./components/submission/SubmissionList.css"
import "./components/ui/SelectTimeInput.css"
import "./components/ui/SearchSelectionInput.css"

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
)