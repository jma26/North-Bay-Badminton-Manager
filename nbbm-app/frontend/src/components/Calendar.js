import React,  { Component } from 'react';

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

  render() {
    const testEvents = [{
      id : 0,
      title: 'Testing',
      allDay: false,
      start: new Date('2018 10 03 11:00:00'),
      end: new Date('2018-10-03 13:00:00')
    }]
    return (
      <div className="calendar">
        <BigCalendar
          events={testEvents}
          startAccessor='start'
          endAccessor='end'
          views={['month', 'day', 'agenda']}
        />
      </div>
    )
  }
}

export default Calendar;