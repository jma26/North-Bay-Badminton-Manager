import React, { Component } from 'react';
import './PlatformHome.css';

import Calendar from './Calendar';
import League from './League';

class PlatformHome extends Component {
  render() {
    return (
      <div className="PlatformHome">
        <League />
        <Calendar />
      </div>
    )
  }
}

export default PlatformHome;