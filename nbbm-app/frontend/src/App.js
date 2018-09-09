import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';


import Register from './components/Register';
import Login from './components/Login';
import Platform from './components/Platform';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Login component will always render */}
        <Route exact path="/" component={ Login } />
        <Switch>
          <Route path="/register" component={ Register } />
          <Route path="/platform" component={ Platform } />
        </Switch>
      </div>
    );
  }
}

export default App;
