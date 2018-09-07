import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './Platform.css';

import { firebaseApp } from '../config/firebase';

import SocketChat from './SocketChat';
import PlatformHome from './PlatformHome';

class Platform extends Component {
  handleLogout() {
    firebaseApp
    .auth()
    .signOut()
    .then(() => {
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

  render() {
    return (
      <div className="Platform">
        <nav>
          <button className="platformlinks-home platformlinks">
            <Link to="/platform/home" style={{textDecoration: 'none'}}> Home </Link>
          </button>
          <button className="platformlinks-chat platformlinks">
            <Link to="/platform/chat" style={{textDecoration: 'none'}}> Chatroom </Link>
          </button>
          <button className="platformlinks-logout platformlink" onClick={() => this.handleLogout()}> Logout </button>
        </nav>
        <Route path="/platform/home" component={ PlatformHome } />
        <Switch>
          <Route path="/platform/chat" component={ SocketChat } />
        </Switch>
      </div>
    )
  }
}

export default Platform;