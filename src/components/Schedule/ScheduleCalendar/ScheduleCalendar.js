import React from 'react';
import ScheduleWeek from '../ScheduleWeek/ScheduleWeek';
import './ScheduleCalendar.css';

const ScheduleCalendar = props => {
  const calendarWeeks = Array(5).fill("Schedule Week ");
  return (
    <div className="schedulecalendar-container">
      {calendarWeeks.map((x, i) => { return (
        <ScheduleWeek key={x + i} day={i}></ScheduleWeek>
      )})}
    </div>
  );
}

export default ScheduleCalendar;