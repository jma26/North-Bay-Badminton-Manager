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
  }
  render() {
    const testEvents = [{
      allDay: false,
      end: new Date('September 07, 2018 05:00:00'),
      start: new Date('September 08, 2018 08:00:00'),
      title: 'Test1'
    }]
    return (
      <div className="calendar">
        <BigCalendar
          events={testEvents}
          startAccessor='startDate'
          endAccessor='endDate'
        />
      </div>
    )
  }
}

export default Calendar;