import React, { Component } from 'react';
import ScheduleCalendar from './ScheduleCalendar/ScheduleCalendar';
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
    if (delta > 0) {
      this.setState({ m: this.state.m.clone().add(delta, 'M') });
    } else {
      this.setState({ m: this.state.m.clone().subtract(delta, 'M') });
    }
  }

  render() {
    return (
      <div className="schedule-container">
        <div className="schedule-calendar">
          <ScheduleCalendar 
              m={this.state.m}
              changeMonth={this.changeMonth}/>
        </div>
      </div>
    );
  }
}

export default Schedule;