import React, { Component } from 'react';
import './JoinLeague.css';

import axios from 'axios';

class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'leagues': [],
      'league_name': ''
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
        <form onSubmit={(e) => this.handleLeagueRegistratio(e)}>
          <label> Create a new league below! </label>
          <input type="text" name="league_name" value={this.state.league_name} placeholder="League name" onChange={(e) => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default JoinLeague;