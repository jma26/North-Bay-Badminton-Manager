import React, { Component } from 'react';
import './Register.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faEnvelope, faLock);

class Register extends Component {
  render() {
    return (
      <div className="Register">
        <h1 className="app-title"> North Bay Badminton Group </h1>
        <div className="register-container">
          <form className="register-form">
            <div>
              <label className={['user', 'input-field'].join(' ')} >
                <input type="text" placeholder="Enter Full Name" autoComplete="disabled" className="input-text" />
              </label>
            </div>
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
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" placeholder="Confirm Password" className="input-password" />
              </label>
            </div>
            <input type="submit" value="Register" class="register-button" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
