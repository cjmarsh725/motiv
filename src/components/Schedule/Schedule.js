import React, { Component } from 'react';
import ScheduleCalendar from './ScheduleCalendar/ScheduleCalendar';
import ScheduleList from './ScheduleList/ScheduleList';
import moment from 'moment';
import './Schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      m: moment(),
      mNow: moment(),
      mSelected: moment(),
      schedule: [
        {
          title: "Coding Preparation Meetup",
          date: "07-29-2019",
          startTime: "6:00 PM",
          endTime: "7:30 PM"
        },
        {
          title: "Bob's Birthday Party",
          date: "07-30-2019",
          startTime: "9:00 PM",
          endTime: "2:00 AM"
        },
        {
          title: "Dentist Appointment",
          date: "07-31-2019",
          startTime: "8:00 AM",
          endTime: "9:00 AM"
        },
      ]
    }
  }

  changeMonth = delta => {
    this.setState({ m: this.state.m.clone().add(delta, 'M') });
  }

  setMonth = date => {
    this.setState({ m: moment(date, "MMMM-YYYY") });
  }

  setSelected = m => {
    this.setState({ mSelected: m });
  }

  render() {
    return (
      <div className="schedule-container">
        <div className="schedule-calendar">
          <ScheduleCalendar 
              m={this.state.m}
              mNow={this.state.mNow}
              mSelected={this.state.mSelected}
              schedule={this.state.schedule}
              changeMonth={this.changeMonth}
              setMonth={this.setMonth}
              setSelected={this.setSelected}/>
        </div>
        <div className="schedule-list">
          <ScheduleList 
              mNow={this.state.mNow}
              mSelected={this.state.mSelected}
              schedule={this.state.schedule}/>
        </div>
      </div>
    );
  }
}

export default Schedule;