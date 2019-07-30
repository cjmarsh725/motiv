import React, { Component } from 'react';
import moment from 'moment';
import './ScheduleList.css';

class ScheduleList extends Component {
  render() {
    return (
      <div className="schedulelist-container">
        <div className="schedulelist-header">
          {"Today is " + this.props.mNow.format("dddd, MMMM Do YYYY")}
          <div className="schedulelist-header-subtitle">Upcoming appointments:</div>
        </div>
        <div className="schedulelist-list">
          {this.props.schedule.map(item => { return (
            <div className="schedulelist-item">
              <div className="schedulelist-item-title">{item.title}</div>
              <div className="schedulelist-item-date">
                {moment(item.date, "MM-DD-YYYY").format("dddd, MMMM Do YYYY") + " at " + item.startTime}
              </div>
            </div>
          );})}
        </div>
      </div>
    );
  }
}

export default ScheduleList;