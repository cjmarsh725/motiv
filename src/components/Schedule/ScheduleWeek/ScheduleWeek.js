import React from 'react';
import './ScheduleWeek.css';

const ScheduleWeek = props => {
  const weekDays = Array(7).fill("Schedule Day ");
  return (
    <div className="scheduleweek-container">
      {weekDays.map((x, i) => { 
        const dayMoment = props.m.clone().add(i, 'd');
        return (
          <div key={x + i} className={"scheduleweek-day" + (
            props.month !== dayMoment.format('MMMM') ?
            " scheduleweek-offday" : "")}>
            {dayMoment.format('D')}
          </div>
      );})}
    </div>
  );
}

export default ScheduleWeek;