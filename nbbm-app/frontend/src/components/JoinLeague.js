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
            {this.state.leagues.map((league) => {
              console.log(league);
              return (
              <tr key={league.id}>
                <td>{league.Club_Name}</td>
              </tr>
              )
            })}
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