import React, { Component } from 'react';
import ScheduleCalendar from './ScheduleCalendar/ScheduleCalendar';
import moment from 'moment';
import './Schedule.css';

class Schedule extends Component {
  render() {
    const m = moment();
    return (
      <div className="schedule-container">
        <div className="schedule-calendar">
          <ScheduleCalendar m={m}/>
        </div>
      </div>
    );
  }
}

export default Schedule;