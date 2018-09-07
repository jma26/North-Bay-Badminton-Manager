import React, { Component } from 'react';
import './Register.css';

import { Link } from 'react-router-dom';

import { fireStore, firebaseApp} from '../config/firebase';
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

  handleRegistration(e) {
    let user = null;
    e.preventDefault();
    console.log(this.state);
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
      }).then(() => {
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
            pathname: '/platform',
            state: {
              'user': user.displayName,
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
  }

  render() {
    return (
      <div className="Register">
        <button className="back-button">
          <Link exact="true" to="/"><FontAwesomeIcon className="angle-left-icon" icon="angle-left" size="2x" /></Link>
        </button>
        <h1 className="app-title"> North Bay Badminton Group </h1>
        <div className="register-container">
          <form className="register-form" onSubmit={(e) => this.handleRegistration(e)}>
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
