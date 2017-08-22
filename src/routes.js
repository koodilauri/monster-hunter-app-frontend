import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import FrontPage from './components/frontpage/FrontPage'
import SubmissionPage from './components/submission/SubmissionPage'
import NavBar from "./components/navBar/NavBar"

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='' render={() =>
        <main className="main-container">
          <NavBar />
          <Route path='/' exact component={FrontPage} />
          <Route path='/submit' exact component={SubmissionPage} />
        </main>
      } />
    </Switch>
  </BrowserRouter>
)