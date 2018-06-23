import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Dashboard from './Dashboard';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Vanhack :: Bold - Hackathon</h1>
        </header>
        <div className="App-intro">
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
