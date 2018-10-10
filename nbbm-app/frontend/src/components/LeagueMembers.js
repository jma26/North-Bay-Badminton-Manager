import React, { Component } from 'react';
import './LeagueMembers.css';

class LeagueMembers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="LeagueMembers">
        <h4 className="teammates-headline"> Teammates </h4>
        <ol className="teammate-list">
          {this.props.teammates.map((teammate, index) => {
            return (
            <li key={index}>{teammate}</li>
            )
          })}
        </ol>
      </div>
    )
  }
}

export default LeagueMembers;