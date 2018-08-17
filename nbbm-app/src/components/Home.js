import React, { Component } from 'react';
import './Home.css';

import { Route, Link, Switch } from 'react-router-dom';

import HomeLinks from './HomeLinks';

class Home extends Component {
  render() {
    return(
      <div className="Home">
      <h1 className="app-title"> North Bay Badminton Group </h1>
        <nav>
          <HomeLinks />
        </nav>
      </div>
    )
  }
}

export default Home;