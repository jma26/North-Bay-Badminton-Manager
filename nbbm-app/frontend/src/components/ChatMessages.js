import React, { Component } from 'react';

function ChatMessages(props) {
  return (
    <div className="ChatMessages">
    {
      props.chatHistory.map((message) => 
        <p> {message} </p>
      )
    }
    </div>
  )
}

export default ChatMessages;