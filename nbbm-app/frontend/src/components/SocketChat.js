import React, { Component } from 'react';
import io from 'socket.io-client';

class SocketChat extends Component {
  constructor(props) {
    super(props);
    this.socket = io('localhost:8000');
  }

  render() {
    return (
      <div className="SocketChat">

      </div>
    )
  }
}

export default SocketChat;