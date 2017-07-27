import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SubmissionPage from './components/submission/SubmissionPage'
import NavBar from "./components/navBar/NavBar"
import image from "./images/"

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='' render={() =>
        <main className="main-container">
          <Route path='/' exact component={NavBar} />
          <div className="container">
            {Object.keys(image).map((key, index) =>
              <img src={image[key]} alt={key} width="21" height="21" key={index} />
            )}
            <img src={require("./images/Log_Icon.png")} width="21" height="21" alt="log" />
          </div>
          <Route path='/' exact component={SubmissionPage} />
        </main>
      } />
    </Switch>
  </BrowserRouter>
)