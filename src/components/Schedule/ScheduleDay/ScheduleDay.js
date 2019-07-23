import React, { Component } from 'react';
import moment from 'moment';
import './ScheduleDay.css';

class ScheduleDay extends Component {
  render() {
    const time = moment().startOf("day");
    const timeBlocks = new Array(12).fill("Time Block ");
    return (
      <div className="scheduleday-container">
        <div className="scheduleday-time-label">
          <div className="scheduleday-time-label-half">AM</div>
          <div>{this.props.m.format("dddd, MMMM Do YYYY")}</div>
          <div className="scheduleday-time-label-half">PM</div>
        </div>
        <div className="scheduleday-time">
          {timeBlocks.map((x, i) => {
            time.add(1, "hour");
            return (
              <div key={x + i} className="scheduleday-time-block">
                <div className="scheduleday-time-block-am">{i < 9 ? <span style={{paddingLeft: "6px"}}></span> : null}{time.format("H:00")}</div>
                <div className="scheduleday-time-block-pm">{time.format("H:00")}</div>
              </div>
          );})}
        </div>
      </div>
    );
  }
}

export default ScheduleDay;