import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './components/app/App'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='' render={() =>
        <main className="main-container">
          <Route path='/' exact component={App} />
        </main>
      } />
    </Switch>
  </BrowserRouter>
)