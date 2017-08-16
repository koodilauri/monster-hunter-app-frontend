import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SubmissionPage from './components/submission/SubmissionPage'
import NavBar from "./components/navBar/NavBar"

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='' render={() =>
        <main className="main-container">
          <Route path='/' exact component={NavBar} />
          <Route path='/' exact component={SubmissionPage} />
        </main>
      } />
    </Switch>
  </BrowserRouter>
)