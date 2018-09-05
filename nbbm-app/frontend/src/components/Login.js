import React, { Component } from 'react';
import './Login.css';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'password': ''
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    if (this.props.location.state) {
      alert('Successful Registration! Login below to');
    }

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
                <input type="text" name="email" value={this.state.email} placeholder="Email Address" autoComplete="disabled" onChange={(e) => this.handleChange(e)} className="input-text" />
              </label>
            </div>
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={(e) => this.handleChange(e)} className="input-password" />
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