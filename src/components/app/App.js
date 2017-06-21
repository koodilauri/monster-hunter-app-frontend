import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SubmissionFrom from "../submission/SubmissionForm";
import SubmissionList from "../submission/SubmissionList";

import doStuff from "../../actions/doStuff";
import store from "../../store";
console.log(store.getState())
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
store.dispatch(doStuff({name:"lauri",quest:"quest1"}))
unsubscribe()

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <SubmissionFrom />        
        <SubmissionList />
      </div>
    );
  }
}

export default App;
