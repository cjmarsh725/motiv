import React from 'react';
import ScheduleWeek from '../ScheduleWeek/ScheduleWeek';
import './ScheduleCalendar.css';

const ScheduleCalendar = props => {
  const calendarWeeks = Array(5).fill("Schedule Week ");
  props.m.startOf('month').startOf('week');
  return (
    <div className="schedulecalendar-container">
      {calendarWeeks.map((x, i) => { return (
        <ScheduleWeek 
            key={x + i} 
            m={props.m.clone().add(i, 'w')} />
      )})}
    </div>
  );
}

export default ScheduleCalendar;