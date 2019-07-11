import React, { Component } from 'react';
import ScheduleCalendar from './ScheduleCalendar/ScheduleCalendar';
import moment from 'moment';
import './Schedule.css';

class Schedule extends Component {
  render() {
    return (
      <div className="schedule-container">
        <div className="schedule-calendar">
          <ScheduleCalendar />
        </div>
      </div>
    );
  }
}

export default Schedule;