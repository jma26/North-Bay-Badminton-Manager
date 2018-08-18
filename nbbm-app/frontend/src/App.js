import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './App.css';


import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Platform from './components/Platform';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={ Home } />
        <Route path="/register" component={ Register } />
        <Route path="/login" component={ Login } />
        <Route path="/platform" component={ Platform } />
      </div>
    );
  }
}

export default App;
