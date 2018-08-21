import React from 'react';
import './ChatMessage.css';

function ChatMessages(props) {

  return (
    <div className="ChatMessages">
    {
      props.chatHistory.map((message) => 
        <p className="message"> {message} </p>
      )
    }
    </div>
  )
}

export default ChatMessages;