import React, { Component } from 'react';
import './LeagueMembers.css';

class LeagueMembers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="LeagueMembers">
        <h4> Teammates </h4>
        <ol className="teammate-list">
          <li> Jacob </li>
          <li> Nolan </li>
        </ol>
      </div>
    )
  }
}

export default LeagueMembers;