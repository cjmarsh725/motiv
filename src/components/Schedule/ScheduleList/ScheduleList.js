import React, { Component } from 'react';
import './ScheduleList.css';

class ScheduleList extends Component {
  render() {
    return (
      <div className="schedulelist-container">
        <div className="schedulelist-header">
          {this.props.m.format("dddd, MMMM Do YYYY")}
        </div>
        <div className="schedulelist-list">
          {this.props.schedule.map(item => { return (
            <div className="schedulelist-item">
              {item.title}
            </div>
          );})}
        </div>
      </div>
    );
  }
}

export default ScheduleList;