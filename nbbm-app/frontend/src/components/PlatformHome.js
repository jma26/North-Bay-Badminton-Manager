import React, { Component } from 'react';
import './PlatformHome.css';

import Calendar from './Calendar';
import League from './League';

class PlatformHome extends Component {
  render() {
    return (
      <div className="PlatformHome">
        <League name={this.props.location.state.name} />
        <Calendar />
      </div>
    )
  }
}

export default PlatformHome;