import React, { Component } from 'react';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faEnvelope, faLock);

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="app-title"> North Bay Badminton Group </h1>
        <div className="signup">
          <form>
            <div>
              <label className={['user', 'input-field'].join(' ')} >
                <input type="text" placeholder="Enter Full Name" />
              </label>
            </div>
            <div>
              <label className={['email', 'input-field'].join(' ')}>
                <input type="text" placeholder="Email Address" />
              </label>
            </div>
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" placeholder="Password" />
              </label>
            </div>
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" placeholder="Confirm Password" />
              </label>
            </div>
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
