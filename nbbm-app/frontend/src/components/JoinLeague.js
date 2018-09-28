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
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8000/getAllLeagues')
    .then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        this.setState({
          'leagues': [...res.data]
        })
      }
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

  handleLeagueRegistration(e) {
    e.preventDefault();
    let league = {
      'league': this.state.league_name
    }
    axios.post('https://localhost:8000/createLeague', {league})
    .then((res) => {
      console.log(res);
    })
  }

  renderTable() {
    if (this.state.leagues > 1) {
      console.log('Detecting more than 1 league names...');
    }
    if (this.state.leagues > 1) {
      this.state.leagues.map((league) => {
        return (
          <tr key={league.id}>
            <td>{league.Club_Name}</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div className="JoinLeague">
        <form onSubmit={(e) => this.handleLeagueRegistratio(e)}>
          <label> Create a new league below! </label>
          <input type="text" name="league_name" value={this.state.league_name} placeholder="League name" onChange={(e) => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
        <table>
          <thead>
            <tr>
              <th> League Names </th>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
        {this.state.leagues.length < 1 && 
          <p> No available leagues </p>
        }
      </div>
    )
  }
}

export default JoinLeague;