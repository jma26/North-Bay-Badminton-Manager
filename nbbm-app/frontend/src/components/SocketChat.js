import React, { Component } from 'react';
import io from 'socket.io-client';

class SocketChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'message': '',
      'messages': []
    }
    this.socket = io('localhost:8000');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      'messages': [...this.state.messages, this.state.message],
      'message': ''
    })
    this.socket.emit('send message', {
      message: this.state.message
    })
    
  }

  render() {
    return (
      <div className="SocketChat">
        <h2> Community Chat </h2>
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <input type="text" name="message" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} placeholder="New Message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export default SocketChat;