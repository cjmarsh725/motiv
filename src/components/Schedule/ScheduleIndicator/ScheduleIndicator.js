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
    const numDates = this.getMatchingDates();
    if (numDates === 0) return null;
    return (
      <div className="scheduleindicator">
        {numDates < 4 ?
          Array(numDates).fill(null).map(x => <div className="scheduleindicator-circle"></div>) :
          <div className="scheduleindicator-bar"></div>
        }
      </div>
    );
  }
}

export default ScheduleIndicator;