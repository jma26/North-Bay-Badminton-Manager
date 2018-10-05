import React, { Component } from 'react';
import './CreateEvent.css';

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
          <div>
            <label className={['title', 'input-field'].join(' ')}>
              <input type="text" name="title" placeholder="Title of event" value={this.state.title} autoComplete="off" onChange={(e) => this.handleChange(e)}></input>
            </label>
          </div>
          <div>
            <label className={['allDay', 'radio-field']}> All day? </label>
            <input type="radio" name="allDay" value="true" onChange={(e) => this.handleChange(e)}></input>
            <input type="radio" name="allDay" value="false" onChange={(e) => this.handleChange(e)}></input>
          </div>
          <div>
            <label className={['start', 'input-field'].join(' ')}>
              <input type="date" name="start" onChange={(e) => this.handleChange(e)} required></input>
              <input type="time" name="startTime" min="7:00" max="20:00" onChange={(e) => this.handleChange(e)}
              required></input>
            </label>
          </div>
          <div>
            <label className={['end', 'input-field'].join(' ')}>
              <input type="date" name="end" onChange={(e) => this.handleChange(e)} required></input>
              <input type="time" name="endTime" min="7:00" max="24:00" onChange={(e) => this.handleChange(e)} required></input>
            </label>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateEvent;