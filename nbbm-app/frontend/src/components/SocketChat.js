import React, { Component } from 'react';
import './SocketChat.css';
import io from 'socket.io-client';

import ChatMessages from './ChatMessages.js';

class SocketChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'message': '',
      'messages': [],
    }
    this.socket = io('localhost:8000');
    this.socket.on('receive_message', (data) => {
      this.setState({
        'messages': [...this.state.messages, data.message]
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.socket.emit('send_message', {
      message: this.state.message
    })
   this.setState({
     'message': ''
   })
  }

  render() {
    return (
      <div className="SocketChat">
        <h2 className="SocketChat-headline"> Community Chat </h2>
        <div className="chat-box">
          <div className="chatbox-container">
            <ChatMessages chatHistory={this.state.messages} />
            <div className="formChat-container">
              <form className="formChat" onSubmit={(e) => this.handleSubmit(e)} >
                <input type="text" name="message" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} placeholder="New Message" />
                <input type="submit" value="Send" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SocketChat;