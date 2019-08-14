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
          date: "8-16-2019 6:00 PM"
        },
        {
          title: "Bob's Birthday Party",
          date: "8-18-2019 9:00 PM"
        },
        {
          title: "Dentist Appointment",
          date: "8-19-2019 8:00 AM"
        },
      ]
    }
  }

  changeMonth = delta => {
    this.setState({ m: this.state.m.clone().add(delta, "M") });
  }

  setMonth = date => {
    this.setState({ m: moment(date, "MMMM-YYYY") });
  }

  setSelected = m => {
    if (this.state.mSelected.isSame(m, "day"))
      this.setState({ mSelected: this.state.mNow })
    else
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