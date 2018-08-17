import React, { Component } from 'react';
import './Login.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends Component {
  render() {
    return (
      <div className="Login">
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
            <input type="submit" value="Sign in" />
          </form>
        </div>
      </div>
    )
  }
}

export default Login;