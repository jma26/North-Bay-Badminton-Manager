import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './App.css';

import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Register } />
        </Switch>
      </div>
    );
  }
}

export default App;
