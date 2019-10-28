import React, { Component } from 'react';
import ScheduleCalendar from './ScheduleCalendar/ScheduleCalendar';
import ScheduleList from './ScheduleList/ScheduleList';
import moment from 'moment';
import axios from 'axios';
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
          date: "9-5-2019 6:00 PM"
        },
        {
          label: "Bob's Birthday Party",
          date: "9-7-2019 9:00 PM"
        },
        {
          label: "Dentist Appointment",
          date: "9-8-2019 8:00 AM"
        },
        {
          label: "Doctor Appointment",
          date: "9-8-2019 10:00 AM"
        },
        {
          label: "Mike's Party",
          date: "9-8-2019 7:00 PM"
        },
        {
          label: "Conference",
          date: "9-10-2019 11:00 AM"
        },
        {
          label: "Jane's Birthday",
          date: "9-10-2019 4:00 PM"
        },
        {
          label: "Skydiving",
          date: "9-10-2019 6:00 PM"
        },
        {
          label: "Javascript Presentation",
          date: "9-10-2019 8:00 PM"
        },
        {
          label: "Lunch w/ Sarah",
          date: "9-13-2019 12:30 PM"
        },
        {
          label: "Dinner w/ Jim",
          date: "9-13-2019 6:30 PM"
        },
      ]
    }
  }

  // Retrieves all appointments and updates state
  getAppointments = () => {
    // Retrieve the list of appointments from the backend and extract the content
    axios
      .get(process.env.REACT_APP_BACKEND + '/appointments/', this.getRequestOptions())
      .then(response => {
        this.setState({ schedule: response.data });
      })
      .catch(err => {
        console.log(err);
        // Redirect to the signin page on error in the assumption that the token was incorrect
        this.props.history.push('/signin');
      });
  }

  // Get a request option object to hold the authorization header for the axios request
  getRequestOptions = () => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };
    return requestOptions;
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