import React, { Component } from 'react';
import './JoinLeague.css';

import { fireStore } from '../config/firebase';
import axios from 'axios';

class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'leagues': [],
      'league_name': '',
      'my_league': '',
      'my_teammates': []
    }
    this.renderUsersTeam = this.renderUsersTeam.bind(this);
  }

  componentDidMount() {
    this.getAllLeagues();
    this.renderUsersTeam();
  }

  getAllLeagues() {
    fireStore.collection('leagues').get()
    .then((querySnapshot) => {
      let queryAllLeagues = []
      querySnapshot.forEach((doc) => {
        queryAllLeagues.push(doc.id);
      })
      this.setState({
        'leagues': [...queryAllLeagues]
      })
    })
    .catch((error) => {
      console.log("Error retrieving collection: ", error);
    })
  }

  renderUsersTeam() {
    fireStore.collection('users').doc(this.props.location.state.name).get()
    .then((doc) => {
      let userInfo = doc.data();
      // Assign user's league to state
      this.setState({
        'my_league': userInfo.league
      })
      console.log(userInfo.league);
      if (!userInfo.league) {
        console.log('User not in a league yet');
      } else {
        console.log('Retrieving user\'s league affiliation');
        // Retrieve user's league info
        fireStore.collection('leagues').doc(userInfo.league).get()
        .then((doc) => {
          if (doc.exists) {
            let roster = doc.data().roster
            // Assign user's league teammates to state
            this.setState({
              'my_teammates': [...roster]
            })
          } else {
            console.log("Document does not exist!");
          }
        })
        .catch((error) => {
          console.log("Error retrieving specific league document: ", error);
        })
      }
    })
    .catch((error) => {
      console.log("Error retrieving document: ", error);
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
      'roster': [this.props.location.state.name],
      'captain': this.props.location.state.name
    })
    .then(() => {
      console.log("Document successfully written");
      // Retrieve index from old league roster
      let index = this.state.my_teammates.indexOf(this.props.location.state.name);
      // Remove user from old league roster
      let my_old_teammates = this.state.my_teammates;
      my_old_teammates.splice(index, 1);
      console.log(my_old_teammates);
      // Delete user from old league roster in firestore
      fireStore.collection("leagues").doc(this.state.my_league).update({
        roster: my_old_teammates,
      })
      // Check if user is captain of old league roster
      fireStore.collection('leagues').doc(this.state.my_league).get()
      .then((doc) => {
        let roster = doc.data().roster
        console.log('Captain of the leageu is: ', doc.data().captain);
        // Relinquish user of captain status of old league
        if (doc.data().captain === this.props.location.state.name) {
          fireStore.collection('leagues').doc(this.state.my_league).update({
            captain: ''
          })
        }
        // Delete league if no one is in the league
        if (roster.length <= 0) {
          fireStore.collection('leagues').doc(this.state.my_league).delete()
          .then((doc) => {
            console.log('Document successfully deleted');
          })
          .catch((error) => {
            console.log('Error removing document: ', error);
          })
        } else if (roster.length > 0) {
          fireStore.collection('leagues').doc(this.state.my_league).update({
            captain: roster[0]
          })
        }
      })
    })
    .catch((error) => {
      console.log('Error creating document: ', error);
    })
    // Update user's league affiliation 
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
      // Re-render league info, call renderUsersTeam and getAllLeagues
      this.renderUsersTeam();
      this.getAllLeagues();
    })
    .catch((error) => {
      console.log('Error updating document: ', error);
    })
  }
  
  joinleague(league) {
    // Check if joining the same league
    if (this.state.my_league === league) {
      console.log('You are already in your league');
    } else if (!this.state.my_league || !this.state.my_teammates) {
      // Update user's league affiliation
      fireStore.collection("users").doc(this.props.location.state.name).update({
        league: league
      })
      .then(() => {
        console.log("Document successfully updated");
        // Update user's league affiliation to state
        this.setState({
          my_league: league
        })
        // Re-render league info, call renderUsersTeam and getAllLeagues
        this.renderUsersTeam();
        this.getAllLeagues();
      })
      .catch((error) => {
        console.log("Error updating document: ", error);
      })
      // Update new league roster with user
      fireStore.collection("leagues").doc(league).get()
      .then((doc) => {
        // League roster from new team
        var roster = doc.data().roster;
        // Add user to new league roster
        roster.push(this.props.location.state.name);
        // Update new league roster in firestore
        fireStore.collection("leagues").doc(league).update({
          roster: roster
        })
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      })
    } else {
      console.log(this.state.my_teammates);
      // Retrieve index from old league roster
      let index = this.state.my_teammates.indexOf(this.props.location.state.name);
      // Remove user from old league roster
      let my_old_teammates = this.state.my_teammates;
      my_old_teammates.splice(index, 1);
      console.log(my_old_teammates);
      // Delete user from old league roster in firestore
      fireStore.collection("leagues").doc(this.state.my_league).update({
        roster: my_old_teammates,
      })
      // Check if user is captain of old league roster
      fireStore.collection('leagues').doc(this.state.my_league).get()
      .then((doc) => {
        let roster = doc.data().roster
        console.log('Captain of the leageu is: ', doc.data().captain);
        // Relinquish user of captain status of old league
        if (doc.data().captain === this.props.location.state.name) {
          fireStore.collection('leagues').doc(this.state.my_league).update({
            captain: ''
          })
        }
        // Delete league if no one is in the league
        if (roster.length <= 0) {
          fireStore.collection('leagues').doc(this.state.my_league).delete()
          .then((doc) => {
            console.log('Document successfully deleted');
          })
          .catch((error) => {
            console.log('Error removing document: ', error);
          })
        } else if (roster.length > 0) {
          fireStore.collection('leagues').doc(this.state.my_league).update({
            captain: roster[0]
          })
        }
      })
      // Update user's league affiliation
      fireStore.collection("users").doc(this.props.location.state.name).update({
        league: league
      })
      .then(() => {
        console.log("Document successfully updated");
        // Update user's league affiliation to state
        this.setState({
          my_league: league
        })
        // Re-render league info, call renderUsersTeam and getAllLeagues
        this.renderUsersTeam();
        this.getAllLeagues();
      })
      .catch((error) => {
        console.log("Error updating document: ", error);
      })
      // Update new league roster with user
      fireStore.collection("leagues").doc(league).get()
      .then((doc) => {
        // League roster from new team
        var roster = doc.data().roster;
        // Add user to new league roster
        roster.push(this.props.location.state.name);
        // Update new league roster in firestore
        fireStore.collection("leagues").doc(league).update({
          roster: roster
        })
      })
    }
  }
  
  render() {
    var no_teammates;
    if (!this.state.my_league && this.state.my_teammates) {
      no_teammates = <tr><td> None </td></tr>
    }

    return (
      <div className="JoinLeague">
        <form onSubmit={(e) => this.handleLeagueRegistration(e)}>
          <label> Create a new league below! </label>
          <input type="text" name="league_name" value={this.state.league_name} placeholder="League name" onChange={(e) => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
        <table className="league-info">
          <thead>
            <tr>
              <th> Your League </th>
              <th> Teammates </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {
                !this.state.my_league ? <td> Not in a league </td> : <td> {this.state.my_league} </td>
              }
              <td>
                <table>
                  <tbody>
                    {this.state.my_teammates.map((teammate, index) => {
                      return (
                          <tr key={index}>
                            <td>{teammate}</td>
                          </tr>
                      )
                    })}
                    {no_teammates}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="available-leagues">
          <thead>
            <tr>
              <th> Available Leagues </th>
            </tr>
          </thead>
          <tbody>
            {this.state.leagues.map((league, index) => {
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