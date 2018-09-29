import React, { Component } from 'react';
import './JoinLeague.css';

import { fireStore } from '../config/firebase';
import axios from 'axios';

class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'leagues': [],
      'league_name': ''
    }
    this.renderUsersTeam = this.renderUsersTeam.bind(this);
  }

  componentDidMount() {
    fireStore.collection('leagues').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          'leagues': [...this.state.leagues, doc.id]
        })
      })
    })
    .catch((error) => {
      console.log("Error retrieving collection: ", error);
    })
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleLeagueRegistration(e) {
    e.preventDefault();
    let league = this.state.league_name
    // Save league name to fireStore
    fireStore.collection('leagues').doc(league).set({
      'users': this.props.location.state.name
    })
    .then(() => {
      console.log("Document successfully written");
    })
    // Update user's league affiliation 
    .then(() => {
      console.log(this.props.location.state.name);
      fireStore.collection('users').doc(this.props.location.state.name)
      .update({
        league: league
      })
      .then(() => {
        console.log("Document successfully updated");
        // Reset league_name state
        this.setState({
          league_name: ''
        })
      })
      .catch((error) => {
        console.log("Error updating document: ", error);
      })
    })
    .catch((error) => {
      console.log("Error writing document: ", error);
    })
  }
  
  render() {
    return (
      <div className="JoinLeague">
        <form onSubmit={(e) => this.handleLeagueRegistration(e)}>
          <label> Create a new league below! </label>
          <input type="text" name="league_name" value={this.state.league_name} placeholder="League name" onChange={(e) => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
        <table>
          <thead>
            <tr>
              <th> Your League </th>
              <th> Teammates </th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsersTeam()}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th> League Names </th>
            </tr>
          </thead>
          <tbody>
            {this.state.leagues.map((league, index) => {
              console.log(league);
              return (
              <tr key={index}>
                <td>{league}</td>
                <td> <button onClick={() => this.joinleague(league)}> Join </button></td>
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