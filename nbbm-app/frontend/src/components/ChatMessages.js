import React, { Component } from 'react';
import './ChatMessage.css';

class ChatMessages extends Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom() {
    this.messageEnd.scrollIntoView({ behavior: 'smooth'});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="ChatMessages">
        <ol>
      {
        this.props.chatHistory.map((message, i) => 
          <li key={i} className="message"> {message} </li>
        )
      }
        </ol>
        <div style={{float: 'left', clear: 'both'}} 
              ref={(el) => {this.messageEnd = el;}}> 
        </div>
      </div>
    )
  }
}

export default ChatMessages;