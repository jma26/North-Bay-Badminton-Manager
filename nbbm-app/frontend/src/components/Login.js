import React, { Component } from 'react';
import './Login.css';

import { Link } from 'react-router-dom';

import { firebaseApp } from '../config/firebase';
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

  handleLogin(e) {
    let user = null;
    e.preventDefault();
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
      user = userCredentials;
      console.log(user);
      this.setState({
        'password': '',
        'email': ''
      })
      this.props.history.push({
        pathname: '/platform/home',
        state: {
          'user': user.user.displayName,
          'email': user.user.email
        }
      })
    }).catch((error) => {
      console.log(error);
      this.setState({
        'password': ''
      })
    })
  }

  onGoogleSignIn(success) {
    console.log(success);
  }

  onGoogleSignInFailure(error) {
    console.log(error);
  }

  componentDidMount() {
    // Load script for google sign-in button to appear
    (function() {
      let e = document.createElement('script');
      e.type= "text/javascript";
      e.async = true;
      e.src = "https://apis.google.com/js/platform.js";
      let t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(e, t)
    })();
    
    window.gapi.load('auth2', () => {
      let auth2 = window.gapi.auth2.init({
        client_id: "639843179540-b5t5jbeng5l0hoa97p4bjaj04bsburvr.apps.googleusercontent.com",
        fetch_basic_profile: true,
        scope: "profile email"
      });
      auth2.then(this.onGoogleSignIn, this.onGoogleSignInFailure)
    })
  }

  render() {
    return (
      <div className="Login">
        <button className="back-button">
          <Link exact="true" to="/"><FontAwesomeIcon className="angle-left-icon" icon="angle-left" size="2x" /></Link>
        </button>
        <div className="g-signin2" data-onsucess={this.onSignIn} />
        <h1 className="app-title"> North Bay Badminton Group </h1>
        <div className="login-container">
          <form className="login-form" onSubmit={(e) => this.handleLogin(e)}>
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