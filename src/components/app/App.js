import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SubmissionFrom from "../submission/SubmissionForm";
import SubmissionList from "../submission/SubmissionList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <SubmissionList />
        <SubmissionFrom />
      </div>
    );
  }
}

export default App;
