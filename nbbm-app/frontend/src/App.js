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
        <Route exact path="/" component={ Register } />
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/platform" component={ Platform } />
        </Switch>
      </div>
    );
  }
}

export default App;
