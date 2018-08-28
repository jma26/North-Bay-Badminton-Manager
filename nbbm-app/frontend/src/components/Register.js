import React, { Component } from 'react';
import './Register.css';

import firebaseApp from '../config/firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faEnvelope, faLock);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'fullName': '',
      'email': '',
      'password': '',
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegistration(e) {
    let user = null;
    e.preventDefault();
    console.log(this.state);
    firebaseApp
      .auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        user = firebaseApp.auth().currentUser;
      }).then(() => {
        user.updateProfile({
          displayName: this.state.fullname
        })
        this.setState({
          'fullName': '',
          'email': '',
          'password': '',
        })
        console.log(user);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="Register">
        <h1 className="app-title"> North Bay Badminton Group </h1>
        <div className="register-container">
          <form className="register-form" onSubmit={(e) => this.handleRegistration(e)}>
            <div>
              <label className={['user', 'input-field'].join(' ')} >
                <input type="text" name="fullname" placeholder="Enter Full Name" autoComplete="disabled" onChange={(e) => this.handleChange(e)} className="input-text" />
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
                <input type="password" name="confirmpassword" placeholder="Confirm Password" className="input-password" />
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
