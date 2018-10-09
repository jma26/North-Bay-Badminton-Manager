import React,  { Component } from 'react';

import axios from 'axios';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './BigCalendar.css';
import './Calendar.css';

// Provide moment object to localizer
BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'events': []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/getevents')
    .then((response) => {
      let events = response.data;
      events.map((event) => {
        console.log(event);
        // Parse date from mysql
        let parsed_start_date = new Date(event.start);
        let parsed_end_date = new Date(event.end);
        // Set new object for current event
        let current_event = {
          id: event.id,
          title: event.Title,
          allDay: event.AllDay,
          start: parsed_start_date,
          end: parsed_end_date,
        }
        // Add to state
        this.setState({
          'events': [...this.state.events, current_event]
        })
      })
    })
  }

  render() {
    return (
      <div className="calendar">
        <BigCalendar
          events={this.state.events}
          startAccessor='start'
          endAccessor='end'
          views={['month', 'day', 'agenda']}
        />
      </div>
    )
  }
}

export default Calendar;