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

           {Object.keys(image).map((key, index) =>
            <img src={image[key]} alt={key} key={index}/>
          )} 
            <img src={require("./images/Log_Icon.png")} alt="log" />

          <Route path='/' exact component={SubmissionPage} />
          {/* <Route path='/' exact component={App} />
          <Route path='/submission' exact component={SubmissionPage} /> */}
        </main>
      } />
    </Switch>
  </BrowserRouter>
)