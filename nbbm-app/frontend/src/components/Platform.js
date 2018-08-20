import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './Platform.css';

import SocketChat from './SocketChat';

class Platform extends Component {
  render() {
    return (
      <div className="Platform">
        <button className="platformlinks-chat platformlinks">
          <Link to="/platform/chat"> Chatroom </Link>
        </button>
        <Switch>
          <Route path="/platform/chat" component={ SocketChat } />
        </Switch>
      </div>
    )
  }
}

export default Platform;