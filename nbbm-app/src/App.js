import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './App.css';


import Home from './components/Home';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={ Home } />
        <Route path="/register" component={ Register } />
      </div>
    );
  }
}

export default App;
