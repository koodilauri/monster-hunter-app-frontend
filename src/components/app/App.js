import React, { Component } from 'react';
import './App.css';

import SubmissionForm from "../submission/SubmissionForm";
import store from '../../store';
require('dotenv').config()



class App extends Component {
  render() {
    return (
      <div className="App">
        <div><h1 className="header-title">Hunters log</h1></div>
        <SubmissionForm store={store}/>        
      </div>
    );
  }
}

export default App;
