import React from 'react';
import './ScheduleWeek.css';

const ScheduleWeek = props => {
  const weekDays = Array(7).fill("Schedule Day ");
  return (
    <div className="scheduleweek-container">
      {weekDays.map((x, i) => <div key={x + i}>{i}</div>)}
    </div>
  );
}

export default ScheduleWeek;