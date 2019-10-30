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
      schedule: []
    }
  }

  // Lifecycle method called when the component is finished mounting in the browser
  componentDidMount() {
    this.getAppointments();
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

  // Sets the moment object in state based on the number of months changed
  changeMonth = delta => {
    this.setState({ m: this.state.m.clone().add(delta, "M") });
  }

  // Helper function to set a moment in state based on a month and year string
  setMonth = date => {
    this.setState({ m: moment(date, "MMMM-YYYY") });
  }

  // Helper function to set the selected moment to the argument or the current moment
  //  if the selected and input moments are on the same day
  setSelected = m => {
    if (this.state.mSelected.isSame(m, "day"))
      this.setState({ mSelected: this.state.mNow.clone() })
    else
      this.setState({ mSelected: m });
  }

  // Adds a new appointment in the database then gets all appointments again to update state
  addAppointment = (label, m) => {
    // Object with label and date fields for creating a new appointment
    const newAppt = { 
      label: label, 
      date: m.format("MM-DD-YYYY h:mm A")
    };
    // Axios request to the backend to make a new appointment given the data provided
    axios
      .post(process.env.REACT_APP_BACKEND + '/appointments/add', newAppt, this.getRequestOptions())
      .then(response => {
        // Get all appointments again including the one that was just made to update state
        this.getAppointments();
      })
      .catch(err => {
        console.log(err);
        // Redirect to the signin page on error in the assumption that the token was incorrect
        this.props.history.push('/signin');
      });
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