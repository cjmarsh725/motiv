import React from 'react';
import './ScheduleWeek.css';

const ScheduleWeek = props => {
  const weekDays = Array(7).fill("Schedule Day ");
  return (
    <div className="scheduleweek-container">
      {weekDays.map((x, i) => { return (
        <div className="scheduleweek-day" key={x + i}>
          {props.m.clone().add(i, 'd').format('D')}
        </div>
      );})}
    </div>
  );
}

export default ScheduleWeek;