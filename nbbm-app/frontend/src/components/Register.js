import React, { Component } from 'react';
import { ValidationErrors } from './validations/ValidationErrors';
import './Register.css';

import { Link } from 'react-router-dom';

import { fireStore, firebaseApp, firebaseMain } from '../config/firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faEnvelope, faLock, faAngleLeft);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'fullName': '',
      'email': '',
      'password': '',
      'confirmpassword': '',
      'error_message': '',
      'error_type': '',
      'successful_registration': false
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegistration(e, type) {
    e.preventDefault();
    let user = null;
    console.log(this.state);
    // "Manual" registration
    if (type === "manual") {
      // Check if password matches confirm password
      if (this.state.password !== this.state.confirmpassword) {
        this.setState({
          'password': '',
          'confirmpassword': '',
          'error_type': "auth/passwords-not-matching",
          'error_message': "Passwords do not match"
        })
        return null;
      }
      // Check if input field for user is filled out
      if (this.state.fullName == '') {
        this.setState({
          'error_type': "auth/no-name",
          'error_message': 'Full name is empty'
        })
        return null;
      }
      // Create new firebase user
      firebaseApp
      .auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        user = firebaseApp.auth().currentUser;
        fireStore.collection('users').add({
          fullName: this.state.fullName,
          email: this.state.email,
        })
        this.setState({
          'successful_registration': true
        })
      })
      .then(() => {
        user.updateProfile({
          displayName: this.state.fullName
        })
        .then(() => {
          this.setState({
            'fullName': '',
            'email': '',
            'password': '',
            'confirmpassword': '',
          })
          this.props.history.push({
            pathname: '/platform/home',
            state: {
              'name': user.displayName,
              'email': user.email
            }
          })
        })
      })
      .catch((error) => {
        console.log(error);
        // Registration Errors
        if (error.code) {
          this.setState({
            'error_message': error.message,
            'error_type': error.code
          })
        }
        // Always reset password if error
        this.setState({
          'password': '',
          'confirmpassword': ''
        })
      });
    } else if (type === "google") {
      console.log('Google registration detected!');
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
      })
      .then((auth2) => {
        console.log('Signed in: ', auth2.isSignedIn.get());
      })
    })
  }

  render() {
    // Initialize error variables
    var error_wrong_password, error_emails, error_weak_password, error_passwords_not_matching, error_no_name, error_email_in_use;
    // If expression to show registration errors
    if (this.state.error_type === 'auth/wrong-password') {
      error_wrong_password = <ValidationErrors type={this.state.error_type} message={this.state.error_message} />
    } else if (this.state.error_type === 'auth/weak-password') {
      error_weak_password = <ValidationErrors type={this.state.error_type} message={this.state.error_message} />
    } else if (this.state.error_type === 'auth/passwords-not-matching') {
      error_passwords_not_matching = <ValidationErrors type={this.state.error_type} message={this.state.error_message} />
    } else if (this.state.error_type === 'auth/invalid-email') {
      error_emails = <ValidationErrors type={this.state.error_type} message={this.state.error_message} />
    } else if (this.state.error_type === 'auth/no-name') {
      error_no_name = <ValidationErrors type={this.state.error_type} message={this.state.error_message} />
    } else if (this.state.error_type === 'auth/email-already-in-use') {
      error_email_in_use = <ValidationErrors type={this.state.error_type} message={this.state.error_message} />
    }

    return (
      <div className="Register">
        <header>
          <h1 className="app-title"> NBBC </h1>
          <Link className="login-link" to="/login"> Log in </Link>
        </header>
        <div className="register-container">
          <div className="gsignin-container">
            <div className="g-signin2" data-width="235" data-theme="dark" data-longtitle="true" onClick={(e) => this.handleRegistration(e, "google")}></div>
          </div>
          <div className="separator">
            <span className="separator_content"> or </span>
          </div>
          <form className="register-form" onSubmit={(e) => this.handleRegistration(e, "manual")}>
            <div>
              <label className={['user', 'input-field'].join(' ')} >
                <input type="text" name="fullName" value={this.state.fullName} placeholder="Enter Full Name" autoComplete="disabled" onChange={(e) => this.handleChange(e)} className="input-text" />
              </label>
              {error_no_name}
            </div>
            <div>
              <label className={['email', 'input-field'].join(' ')}>
                <input type="text" name="email" value={this.state.email} placeholder="Email Address" autoComplete="disabled" onChange={(e) => this.handleChange(e)} className="input-text" />
              </label>
              {error_emails}
              {error_email_in_use}
            </div>
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} placeholder="Password" className="input-password" />
              </label>
              {error_passwords_not_matching}
              {error_wrong_password} 
              {error_weak_password}
            </div>
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" name="confirmpassword" value={this.state.confirmpassword} onChange={(e) => this.handleChange(e)} placeholder="Confirm Password" className="input-password" />
              </label>
            </div>
            <input type="submit" value="Register" className="register-button" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
