import React, { Component } from 'react';
import { LoginErrors } from './validations/LoginErrors';
import './Login.css';

import { Link } from 'react-router-dom';

import { firebaseApp } from '../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'password': '',
      'error_message': '',
      'error_type': ''
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
          'name': user.user.displayName,
          'email': user.user.email
        }
      })
    }).catch((error) => {
      console.log(error);
      // Login errors
      if (error.code === "auth/wrong-password") {
        this.setState({
          'error_message': error.message,
          'error_type': error.code
        })
        
      } else if (error.code === "auth/user-not-found") {
        this.setState({
          'error_message': error.message,
          'error_type': error.code,
          'email': ''
        })
      } else if (error.code === "auth/invalid-email") {
        this.setState({
          'error_message': error.message,
        'error_type': error.code
        })
      }
      // Reset password if error
      this.setState({
        'password': ''
      })
    })
  }

  googleLogin() {
    console.log('googleLogin() detected!');
    // Initialize auth2 to be fulfilled by a GoogleAuth object
    let auth2 = window.gapi.auth2.getAuthInstance();
    // Sign the user in
    auth2.signIn().then(() => {
      // Use currentUser to return a GoogleUser object and call getBasicProfile() with it
      let profile = auth2.currentUser.get().getBasicProfile();
      console.log(profile.getName());
      console.log(profile.getEmail());
      this.props.history.push({
        pathname: '/platform/home',
        state: {
          'name': profile.getName(),
          'email': profile.getEmail()
        }
      })
    })
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

    // Load auth2
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: "639843179540-b5t5jbeng5l0hoa97p4bjaj04bsburvr.apps.googleusercontent.com",
        scope: "profile email"
      })
      .then((auth2) => {
        console.log('Signed in: ', auth2.isSignedIn.get());
      })
    })
  }

  render() {
    // If expression to show login errors
    var error_wrong_password;
    var error_emails;
    if (this.state.error_message && this.state.error_type == 'auth/wrong-password') {
      error_wrong_password = <LoginErrors type={this.state.error_type} message={this.state.error_message} />
    } else if (this.state.error_message) {
      error_emails = <LoginErrors type={this.state.error_type} message={this.state.error_message} />
    }

    return (
      <div className="Login">
        <header>
          <h1 className="app-title"> NBBC </h1>
          <Link className="register-link" to="/"> Sign up </Link>
        </header>
        <div className="login-container">
          <div className="gsignin-container">
            <div className="g-signin2" data-width="235" data-theme="dark" data-longtitle="true" onClick={() => this.googleLogin()}></div>
          </div>
          <div className="separator">
            <span className="separator_content"> or </span>
          </div>
          <form className="login-form" onSubmit={(e) => this.handleLogin(e)}>
            <div>
              <label className={['email', 'input-field'].join(' ')}>
                <input type="text" name="email" value={this.state.email} placeholder="Email Address" autoComplete="disabled" onChange={(e) => this.handleChange(e)} className="input-text" />
              </label>
              {error_emails}
            </div>
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={(e) => this.handleChange(e)} className="input-password" /> 
              </label>
              {error_wrong_password}
            </div>
            <input type="submit" value="Sign in" className="login-button"/>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;