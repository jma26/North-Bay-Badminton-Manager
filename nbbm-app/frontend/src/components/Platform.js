import React, { Component } from 'react';
import './Platform.css';

import SocketChat from './SocketChat';

class Platform extends Component {
  render() {
    return (
      <div className="Platform">
        <SocketChat />
      </div>
    )
  }
}

export default Platform;