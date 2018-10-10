import React, { Component } from 'react';
import './CreateEvent.css';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      allDay: false,
      start: '',
      end: '',
      startTime: '',
      endTime: ''
    }
  }
  
  submitNewEvent(e) {
    e.preventDefault();
    console.log(this.state);
    // Concatenate time with date
    let start_date = `${this.state.start} ${this.state.startTime}`
    let end_date = `${this.state.end} ${this.state.endTime}`
    // Create new date object
    let new_start_date = new Date(start_date);
    let new_end_date = new Date(end_date);
    // Stringify for mysql storage and store in event object
    let event = {
      title: this.state.title,
      allDay: this.state.allDay,
      start: JSON.stringify(new_start_date),
      end: JSON.stringify(new_end_date)
    }

    axios.post('http://localhost:8000/newevent', event)
    .then((response) => {
      alert('Success! New event added');
      console.log('Success creating new event: ', response);
      // Reset state
      this.setState({
        title: '',
        allDay: false,
        start: '',
        end: '',
        startTime: '',
        endTime: ''
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <div className="CreateEvent">
        <form className="new-event-form" onSubmit={(e) => this.submitNewEvent(e)}>
          <div className="title-container">
            <input type="text" name="title" placeholder="Name of event..." value={this.state.title} autoComplete="off" onChange={(e) => this.handleChange(e)} required />
          </div>
          <div className="allDay-container">
            <label className="allDay"> All day? </label>
            <input type="radio" name="allDay" value="true" onChange={(e) => this.handleChange(e)} />
            <label htmlFor="true"> True </label>
            <input type="radio" name="allDay" value="false" onChange={(e) => this.handleChange(e)} defaultChecked />
            <label htmlFor="false"> False </label>
          </div>
          <div className="event-container">
            <div className="start-container">
              <div className="start-date">
                <div className="start-date-label">
                  <label htmlFor="start-date" className="date-time-label"> Start date </label>
                </div>
                <input type="date" name="start" value={this.state.start} onChange={(e) => this.handleChange(e)} required />
              </div>
              <div className="start-time">
                <div className="start-time-label">
                  <label htmlFor="start-time" className="date-time-label"> Start time</label>
                </div>
                <input type="time" name="startTime" value={this.state.startTime} min="7:00" max="20:00" onChange={(e) => this.handleChange(e)} required />
              </div>
            </div>
            <div className="end-container">
              <div className="end-date">
                <div className="end-date-label">
                  <label htmlFor="end-date" className="date-time-label"> End date </label>
                </div>
                <input type="date" name="end" value={this.state.end} onChange={(e) => this.handleChange(e)} required />
              </div>
              <div className="end-time">
                <div className="end-time-label">
                  <label htmlFor="end-time" className="date-time-label"> End time </label>
                </div>
                <input type="time" name="endTime" min="7:00" max="24:00" value={this.state.endTime} onChange={(e) => this.handleChange(e)} required />
              </div>
            </div>
          </div>
          <input type="submit" value="Create event" className="create-event-btn" />
        </form>
      </div>
    )
  }
}

export default CreateEvent;