import React, { Component } from 'react';
import ScheduleCalendar from './ScheduleCalendar/ScheduleCalendar';
import ScheduleDay from './ScheduleDay/ScheduleDay';
import moment from 'moment';
import './Schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      m: moment()
    }
  }

  changeMonth = delta => {
    this.setState({ m: this.state.m.clone().add(delta, 'M') });
  }

  setMonth = date => {
    this.setState({ m: moment(date, "MMMM-YYYY") });
  }

  render() {
    return (
      <div className="schedule-container">
        <div className="schedule-calendar">
          <ScheduleCalendar 
              m={this.state.m}
              changeMonth={this.changeMonth}
              setMonth={this.setMonth}/>
        </div>
        <div className="schedule-day">
          <ScheduleDay />
        </div>
      </div>
    );
  }
}

export default Schedule;