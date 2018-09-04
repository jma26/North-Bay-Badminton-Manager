import React from 'react';
import './ChatMessage.css';

function ChatMessages(props) {
  
  return (
    <div className="ChatMessages">
      <ol>
    {
      props.chatHistory.map((message) => 
        <li className="message"> {message} </li>
      )
    }
      </ol>
    </div>
  )
}

export default ChatMessages;