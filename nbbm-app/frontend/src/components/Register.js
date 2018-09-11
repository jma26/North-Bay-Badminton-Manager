import React, { Component } from 'react';
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
        this.setState({
          'password': '',
          'confirmpassword': ''
        })
      });
    } else if (type === "google") {
      let provider = new firebaseMain.auth.GoogleAuthProvider();
      firebaseApp.auth().signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        console.log(user);
        console.log(user.displayName);
        console.log(user.email);
        fireStore.collection('users').add({
          fullName: user.displayName,
          email: user.email
        })
        this.props.history.push({
          pathname: '/platform/home',
          state: {
            'name': user.displayName,
            'email': user.email
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
    return (
      <div className="Register">
        <h1 className="app-title"> North Bay Badminton Group </h1>
        <div className="register-container">
        <div className="gsignin-container">
          <div className="g-signin2" data-width="235" data-theme="dark" data-longtitle="true" onClick={(e) => this.handleRegistration(e, "google")}></div>
        </div>
          <form className="register-form" onSubmit={(e) => this.handleRegistration(e, "manual")}>
            <div>
              <label className={['user', 'input-field'].join(' ')} >
                <input type="text" name="fullName" value={this.state.fullName} placeholder="Enter Full Name" autoComplete="disabled" onChange={(e) => this.handleChange(e)} className="input-text" />
              </label>
            </div>
            <div>
              <label className={['email', 'input-field'].join(' ')}>
                <input type="text" name="email" value={this.state.email} placeholder="Email Address" autoComplete="disabled" onChange={(e) => this.handleChange(e)} className="input-text" />
              </label>
            </div>
            <div>
              <label className={['password', 'input-field'].join(' ')}>
                <FontAwesomeIcon className="password" icon="lock" />
                <input type="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} placeholder="Password" className="input-password" />
              </label>
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
