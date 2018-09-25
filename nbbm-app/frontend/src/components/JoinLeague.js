import React, { Component } from 'react';
import './JoinLeague.css';

import axios from 'axios';

class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'leagues': []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/getAllLeagues')
    .then((res) => {
      console.log(res);
    })
    .then((leagues) => {
      this.setState({
        'leagues': [...leagues]
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    var no_leagues;
    // Check if any leagues exist
    if (this.state.leagues.length < 1) {
      no_leagues = <p> No available leagues </p>
    }
    return (
      <div className="JoinLeague">
        <p> {no_leagues} </p>
      </div>
    )
  }
}

export default JoinLeague;