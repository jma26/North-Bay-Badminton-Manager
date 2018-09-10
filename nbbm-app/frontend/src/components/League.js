import React, { Component} from 'react';
import './League.css';

class League extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'league': null
    }
  }
  
  render() {
    return (
      <div className="league">
        <input type="button" className="league-button" value="Join a league!" />
        <table>
          <thead>
            <tr>
              <th> League Names </th>
              <th> Wins </th>
              <th> Losses </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Team Dumbledores </td>
              <td> 4 </td>
              <td> 2 </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default League;