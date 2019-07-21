import React, { Component } from 'react';
import moment from 'moment';
import './ScheduleDay.css';

class ScheduleDay extends Component {
  render() {
    const time = moment().startOf("day");
    const timeBlocks = new Array(12).fill("Time Block ");
    return (
      <div className="scheduleday-container">
        <div className="scheduleday-time-labels">
          <div>AM</div>
          <div>PM</div>
        </div>
        <div className="scheduleday-time">
          {timeBlocks.map((x, i) => {
            time.add(1, "hour");
            return (
              <div key={x + i} className="scheduleday-time-block">{time.format("H:00")}</div>
          );})}
        </div>
      </div>
    );
  }
}

export default ScheduleDay;