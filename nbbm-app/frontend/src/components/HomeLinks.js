import React, { Component } from 'react';
import './HomeLinks.css';

import { Link } from 'react-router-dom';

class HomeLinks extends Component {
  render() {
    return (
      <div className="HomeLinks">
        <nav>
          <button className="homelinks-login homelinks">
            <Link className="homelinks-inactive" exact="true" to="/login" style={{display: 'block', height: '100%', padding: '12px 0px'}}> Login </Link>
          </button>
          <button className="homelinks-register homelinks">
            <Link className="homelinks-inactive" exact="true" to="/register" style={{display: 'block', height: '100%', padding: '12px 0px'}}> Register </Link>
          </button>
        </nav>
      </div>
    )
  }
}

export default HomeLinks;