import React, { Component } from 'react';
import './ChatUsers.css';

class ChatUsers extends Component {
  render() {
    return (
      <div className="ChatUsers">
        <ol>
          {
            this.props.activeUsers.map((user, i) => 
              <li key={i} className="user"> {user} </li>
            )
          }
        </ol>
      </div>
    )
  }
}

export default ChatUsers;