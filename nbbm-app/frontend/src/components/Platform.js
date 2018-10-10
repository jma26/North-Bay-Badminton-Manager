import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './Platform.css';

import { firebaseApp, fireStore } from '../config/firebase';

import SocketChat from './SocketChat';
import PlatformHome from './PlatformHome';
import JoinLeague from './JoinLeague';
import CreateEvent from './CreateEvent';

class Platform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'captain': false,
      'my_league': ''
    }
    this.updateLeague = this.updateLeague.bind(this);
  }

  updateLeague(new_league) {
    console.log(new_league);
    this.setState({
      'my_league': new_league
    })
    console.log('Forcing a re-rendering....');
    // Retrieve user info
    fireStore.collection('users').doc(this.props.location.state.name).get()
    .then((userInfo) => {
      console.log(userInfo);
      this.setState({
        'my_league': userInfo.data().league
      })
      return userInfo
    })
    .catch((error) => {
      console.log('Error retrieving document: ', error);
    })
    // Chain the userInfo into retrieving league info of user
    .then((userInfo) => {
      if (userInfo.data().league === '') {
        console.log('User is not in a league');
      } else {
        fireStore.collection('leagues').doc(userInfo.data().league).get()
        // Check if user is captain of the league
        .then((leagueInfo) => {
          console.log(leagueInfo.data().captain);
          if (userInfo.data().fullName === leagueInfo.data().captain) {
            console.log('You are the captain!', leagueInfo.data().captain);
            this.setState({
              'captain': true
            })
          } else {
            this.setState({
              'captain': false
            })
          }
        })
      }
    })
    .catch((error) => {
      console.log('Error retrieving document: ', error);
    })
  }

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

    // Retrieve user info
    fireStore.collection('users').doc(this.props.location.state.name).get()
    .then((userInfo) => {
      console.log(userInfo);
      this.setState({
        'my_league': userInfo.data().league
      })
      return userInfo
    })
    .catch((error) => {
      console.log('Error retrieving document: ', error);
    })
    // Chain the userInfo into retrieving league info of user
    .then((userInfo) => {
      if (userInfo.data().league === '') {
        console.log('User is not in a league');
      } else {
        fireStore.collection('leagues').doc(userInfo.data().league).get()
        // Check if user is captain of the league
        .then((leagueInfo) => {
          console.log(leagueInfo.data().captain);
          if (userInfo.data().fullName === leagueInfo.data().captain) {
            console.log('You are the captain!', leagueInfo.data().captain);
            this.setState({
              'captain': true
            })
          } else {
            this.setState({
              'captain': false
            })
          }
        })
      }
    })
    .catch((error) => {
      console.log('Error retrieving document: ', error);
    })
  }

  render() {
    var createEventBtn;
    if (this.state.captain) {
      createEventBtn = <button className="platformlinks-event platformlinks">
        <Link to={{
          pathname: '/platform/createevent',
          state: {
            'name': this.props.location.state.name,
            'email': this.props.location.state.email
          }
        }} style={{textDecoration: 'none', color: '#FFF', letterSpacing: '1px'}}> Create event </Link>
      </button>
    }

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
            }} style={{textDecoration: 'none', color: '#FFF', letterSpacing: '1px'}}> Home </Link>
          </button>
          <button className="platformlinks-chat platformlinks">
            <Link to={{
              pathname: '/platform/chat',
              state: {
                'name': this.props.location.state.name,
                'email': this.props.location.state.email
              }
            }} style={{textDecoration: 'none', color: '#FFF', letterSpacing: '1px'}}> Chatroom </Link>
          </button>
          <button className="platformlinks-league platformlinks">
            <Link to={{
              pathname: '/platform/joinleague',
              state: {
                'name': this.props.location.state.name,
                'email': this.props.location.state.email
              }
            }} style={{textDecoration: 'none', color: '#FFF', letterSpacing: '1px'}}> Join a League </Link>
          </button>
          {createEventBtn}
          <button className="platformlinks-logout platformlinks" onClick={() => this.handleLogout()}> Logout </button>
        </nav>
        <Route path="/platform/home" component={ PlatformHome } />
        <Switch>
          <Route path="/platform/chat" component={ SocketChat } />
          <Route path="/platform/joinleague" render={(props) => (
            <JoinLeague {...props} shouldLeagueUpdate={this.updateLeague} />
          )} />
          <Route path="/platform/createevent" component={ CreateEvent } />
        </Switch>
      </div>
    )
  }
}

export default Platform;