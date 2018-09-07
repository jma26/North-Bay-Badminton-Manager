import React, { Component } from 'react';
import './PlatformHome.css';

import Calendar from './Calendar';

class PlatformHome extends Component {
  render() {
    return (
      <div className="PlatformHome">
        <Calendar />
      </div>
    )
  }
}

export default PlatformHome;