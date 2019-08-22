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
          label: "Coding Preparation Meetup",
          date: "8-16-2019 6:00 PM"
        },
        {
          label: "Bob's Birthday Party",
          date: "8-18-2019 9:00 PM"
        },
        {
          label: "Dentist Appointment",
          date: "8-19-2019 8:00 AM"
        },
        {
          label: "Doctor Appointment",
          date: "8-21-2019 10:00 AM"
        },
        {
          label: "Mike's Party",
          date: "8-21-2019 7:00 PM"
        },
        {
          label: "Conference",
          date: "8-23-2019 11:00 AM"
        },
        {
          label: "Jane's Birthday",
          date: "8-25-2019 4:00 PM"
        },
        {
          label: "Skydiving",
          date: "8-26-2019 6:00 PM"
        },
        {
          label: "Javascript Presentation",
          date: "8-28-2019 8:00 PM"
        },
        {
          label: "Lunch w/ Sarah",
          date: "8-29-2019 12:30 PM"
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
      this.setState({ mSelected: this.state.mNow.clone() })
    else
      this.setState({ mSelected: m });
  }

  addAppointment = (label, m) => {
    const schedule = [...this.state.schedule];
    const newApp = { 
      label: label, 
      date: m.format("MM-DD-YYYY h:mm A")
    };
    if (schedule.length === 0) schedule.push(newApp);
    else {
      for (let i = 0; i < schedule.length; i++) {
        console.log(moment(schedule[i].date, "MM-DD-YYYY h:mm A").isAfter(m, "minute"));
        if (moment(schedule[i].date, "MM-DD-YYYY h:mm A").isAfter(m, "minute")) {
          schedule.splice(i, 0, newApp);
          break;
        } else if (i === schedule.length - 1) {
          schedule.push(newApp);
          break;
        }
      }
    }
    this.setState({ schedule });
  }

  deleteAppointment = indexArray => {
    if (indexArray.length === 0) return;
    const schedule = [...this.state.schedule];
    for (let i = indexArray.length - 1; i >= 0; i--) {
      schedule.splice(indexArray[i], 1);
    }
    this.setState({ schedule });
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
              schedule={this.state.schedule}
              addAppointment={this.addAppointment}
              deleteAppointment={this.deleteAppointment}/>
        </div>
      </div>
    );
  }
}

export default Schedule;