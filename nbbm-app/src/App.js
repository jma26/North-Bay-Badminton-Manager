import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> North Bay Badminton Group </h1>
        <div className="signup">
          <form>
            <input type="text" placeholder=" Your name..." />
            <input type="text" placeholder=" Your email address..." />
            <input type="password" placeholder=" Your password..." />
            <input type="password" placeholder=" Password again..." />
            <input type="submit" value="Sign up!" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
