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
    this.socket.on('receive_message', (data) => {
      addMessage(data);
    })
    const addMessage = (data) => {
      console.log(data);
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    this.socket.emit('send_message', {
      message: this.state.message
    })
  }

  render() {
    return (
      <div className="SocketChat">
        <h2> Community Chat </h2>
        <div className="chat-box">
        </div>
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <input type="text" name="message" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} placeholder="New Message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export default SocketChat;