import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import SubmissionForm from "./SubmissionForm"
import store from "../../store"

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(
    <Provider store={store}>
      <SubmissionForm quests={[]} submissions={[]} submitSubmission={()=>{}}/>
    </Provider>,
    div)
})