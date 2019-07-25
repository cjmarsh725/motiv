import React, { Component } from 'react';
import './ScheduleList.css';

class ScheduleList extends Component {
  render() {
    return <div>{this.props.m.format("dddd, MMMM Do YYYY")}</div>;
  }
}

export default ScheduleList;