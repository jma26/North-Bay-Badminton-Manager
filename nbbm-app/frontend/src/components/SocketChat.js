import React, { Component } from 'react';
import './SocketChat.css';
import io from 'socket.io-client';

import ChatMessages from './ChatMessages.js';
import ChatUsers from './ChatUsers.js';

class SocketChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'message': '',
      'messages': [],
      'activeUsers': []
    }

    this.socket = io('localhost:8000');
    // Add sent messages to chat history
    this.socket.on('send_received_message', (data) => {
      this.setState({
        'messages': [...this.state.messages, data.message]
      })
    })
    // Update user with whole chat history
    this.socket.on('chat_history', (data) => {
      this.setState({
        'messages': [...this.state.messages, data.message]
      })
    })
    // Update activeUsers array
    this.socket.on('active_users', (data) => {
      this.setState({
        'activeUsers': [...this.state.activeUsers, data.user]
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.socket.emit('send_message', {
      message: this.state.message +  ` - ${this.props.location.state.name}`
    })
   this.setState({
     'message': ''
   })
  }

  componentDidMount() {
    // Emit to server that new_user appeared!
    this.socket.emit('new_user', {
      user: this.props.location.state.name
    })
  }

  render() {
    return (
      <div className="SocketChat">
        <h2 className="SocketChat-headline"> Community Chat </h2>
        <div className="chat-box">
          <div className="active-users">
            <ChatUsers activeUsers={this.state.activeUsers} />
          </div>
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