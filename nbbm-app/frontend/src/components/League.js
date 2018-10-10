import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import './League.css';

import { fireStore } from '../config/firebase';

import LeagueMembers from './LeagueMembers';

class League extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'league': null,
      'my_league': '',
      'my_teammates': [],
      'leagues': []
    }
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
      console.log('Error retrieving collection: ', error);
    })
  }

  renderUsersTeam() {
    fireStore.collection('users').doc(this.props.name).get()
    .then((doc) => {
      let userInfo = doc.data();
      // Assign user's league to state
      this.setState({
        'my_league': userInfo.league
      })
      console.log('My league is ', userInfo.league);
      if (!userInfo.league) {
        console.log('User not in a league yet');
      } else {
        console.log('Retrieving user\'s league affiliation');
        fireStore.collection('leagues').doc(userInfo.league).get()
        .then((doc) => {
          if (doc.exists) {
            let roster = doc.data().roster
            // Assign user's league teammates to state
            this.setState({
              'my_teammates': [...roster]
            })
          } else {
            console.log('Document does not exist!');
          }
        })
        .catch((error) => {
          console.log('Error retrieving specific league document: ', error);
        })
      }
    })
    .catch((error) => {
      console.log('Error retrieving document: ', error);
    })
  }

  render() {
    return (
      <div className="League">
        <h4 className="league-name"> {this.state.my_league ? this.state.my_league : 'Not in a league, join one now!'} </h4>
        <LeagueMembers teammates={this.state.my_teammates}/>
        <table className="league-rankings">
          <thead>
            <tr>
              <th> Leagues </th>
              <th> Wins </th>
              <th> Losses </th>
            </tr>
          </thead>
          <tbody>
            {this.state.leagues.map((league, index) => {
              return (
                <tr key={index}>
                  <td>{league}</td>
                  <td> 0 </td>
                  <td> 0 </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default League;