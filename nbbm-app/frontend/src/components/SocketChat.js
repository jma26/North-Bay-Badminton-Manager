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
    this.socket.on('send_received_message', (data) => {
      this.setState({
        'messages': [...this.state.messages, data.message]
      })
    })
    this.socket.on('announce_new_user', (data) => {
      this.setState({
        'messages': [...this.state.messages, data]
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

  componentDidMount() {
    this.socket.emit('new_user', {
      message: this.props.location.state.name
    })
  }

  render() {
    return (
      <div className="SocketChat">
        <h2 className="SocketChat-headline"> Community Chat </h2>
        <div className="chat-box">
          <div className="chatbox-container">
            <ChatMessages chatHistory={this.state.messages} />
              <form className="formChat" onSubmit={(e) => this.handleSubmit(e)} >
                <input type="text" name="message" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} placeholder="New Message" className="message-input" />
                <input type="submit" value="Send" className="send-button" />
              </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SocketChat;