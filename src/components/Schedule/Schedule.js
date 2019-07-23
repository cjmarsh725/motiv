import React, { Component } from 'react';
import ScheduleCalendar from './ScheduleCalendar/ScheduleCalendar';
import ScheduleDay from './ScheduleDay/ScheduleDay';
import moment from 'moment';
import './Schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      m: moment(),
      schedule: {
        "Sunday": [],
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [{name: "Coders Meeting", startTime: "10:00 AM", endTime: "11:00 AM"}],
        "Friday": [],
        "Saturday": [],
        "07-25-2019": [{name: "Birthday Dinner", startTime: "5:00 PM", endTime: "7:00 PM"}]
      }
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
              setMonth={this.setMonth}
              schedule={this.state.schedule}/>
        </div>
        <div className="schedule-day">
          <ScheduleDay 
              m={this.state.m}
              schedule={this.state.schedule}/>
        </div>
      </div>
    );
  }
}

export default Schedule;