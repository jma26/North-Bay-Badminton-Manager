import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './Platform.css';

import SocketChat from './SocketChat';
import PlatformHome from './PlatformHome';

class Platform extends Component {
  render() {
    return (
      <div className="Platform">
        <nav>
          <button className="platformlinks-chat platformlinks">
            <Link to="/platform/home" style={{textDecoration: 'none'}}> Home </Link>
          </button>
          <button className="platformlinks-chat platformlinks">
            <Link to="/platform/chat" style={{textDecoration: 'none'}}> Chatroom </Link>
          </button>
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