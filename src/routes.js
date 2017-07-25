import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import App from './components/app/App' --> FrontPage?
import SubmissionPage from './components/submission/SubmissionPage'
import image from "./images/"

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='' render={() =>
        <main className="main-container">
          {/* <NavBar /> */}
          {Object.keys(image).map((key, index) => 
            <img src={image[key]} alt={key}/>
          )}

          <Route path='/' exact component={SubmissionPage} />
          {/* <Route path='/' exact component={App} />
          <Route path='/submission' exact component={SubmissionPage} /> */}
        </main>
      } />
    </Switch>
  </BrowserRouter>
)