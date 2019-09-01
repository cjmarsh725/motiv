import React, { Component } from 'react';
import moment from 'moment';
import './ScheduleIndicator.css';

class ScheduleIndicator extends Component {
  getMatchingDates = () => {
    let count = 0;
    this.props.schedule.forEach(item => {
      const date = moment(item.date, "MM-DD-YYYY h:mm A");
      if (date.isSame(this.props.m, "day")) count++;
    });
    return count;
  }

  render() {
    return (
      <div className="scheduleindicator">
        {this.getMatchingDates()}
      </div>
    );
  }
}

export default ScheduleIndicator;