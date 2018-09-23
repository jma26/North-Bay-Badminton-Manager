import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './Platform.css';

import { firebaseApp } from '../config/firebase';

import SocketChat from './SocketChat';
import PlatformHome from './PlatformHome';
import JoinLeague from './JoinLeague';

class Platform extends Component {
  handleLogout() {
    firebaseApp
    .auth()
    .signOut()
    .then(() => {
      this.checkGoogleAuthInstance();
      console.log('User logged out successful!')
      // Redirect on successful promise from signOut()
      this.props.history.push({
        pathname: '/'
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  checkGoogleAuthInstance() {
    // Initialize auth2 to be fulfilled by a GoogleAuth object
    let auth2 = window.gapi.auth2.getAuthInstance();
    console.log(auth2.isSignedIn.get());
    if (auth2.isSignedIn.get()) {
      auth2.signOut().then(() => {
        console.log('User logged out of Google!');
      })
      // Revoke scope & credentials
      auth2.disconnect().then(() => {
        console.log('User disconnected from Google!');
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
    return (
      <div className="Platform">
        <nav>
          <button className="platformlinks-home platformlinks">
            <Link to={{
              pathname: '/platform/home',
              state: {
                'name': this.props.location.state.name,
                'email': this.props.location.state.email
              }
            }} style={{textDecoration: 'none'}}> Home </Link>
          </button>
          <button className="platformlinks-chat platformlinks">
            <Link to={{
              pathname: '/platform/chat',
              state: {
                'name': this.props.location.state.name,
                'email': this.props.location.state.email
              }
            }} style={{textDecoration: 'none'}}> Chatroom </Link>
          </button>
          <button className="platformlinks-league platformlinks">
            <Link to={{
              pathname: '/platform/joinleague',
              state: {
                'name': this.props.location.state.name,
                'email': this.props.location.state.email
              }
            }} style={{textDecoration: 'none'}}> Join a League! </Link>
          </button>
          <button className="platformlinks-logout platformlink" onClick={() => this.handleLogout()}> Logout </button>
        </nav>
        <Route path="/platform/home" component={ PlatformHome } />
        <Switch>
          <Route path="/platform/chat" component={ SocketChat } />
          <Route path="/platform/joinleague" component={ JoinLeague } />
        </Switch>
      </div>
    )
  }
}

export default Platform;