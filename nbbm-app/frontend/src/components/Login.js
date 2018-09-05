import React, { Component } from 'react';
import './Login.css';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <button className="back-button">
          <Link exact="true" to="/"><FontAwesomeIcon className="angle-left-icon" icon="angle-left" size="2x" /></Link>
        </button>
        <h1 className="app-title"> North Bay Badminton Group </h1>
        <div className="login-container">
          <form className="login-form">
            <div>
              <label className={['email', 'input-field'].join(' ')}>
                <input type="text" placeholder="Email Address" autoComplete="disabled" className="input-text" />
              </label>
            </div>
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" placeholder="Password" className="input-password" />
              </label>
            </div>
            <input type="submit" value="Sign in" className="login-button"/>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;