import React from 'react';
import ScheduleWeek from '../ScheduleWeek/ScheduleWeek';
import './ScheduleCalendar.css';

const ScheduleCalendar = props => {
  const calendarWeeks = Array(5).fill("Schedule Week ");
  const month = props.m.format('MMMM');
  const m = props.m.clone().startOf('month').startOf('week');
  return (
    <div className="schedulecalendar-container">
      <div className="schedulecalendar-month">
        <div className="schedulecalendar-month-btn"
              onClick={() => props.changeMonth(-1)}>
          <i className="fas fa-caret-up"></i>
        </div>
        <div className="schedulecalendar-month-label">
          {month}
        </div>
        <div className="schedulecalendar-month-btn"
              onClick={() => props.changeMonth(1)}>
          <i className="fas fa-caret-down"></i>
        </div>
      </div>
      {calendarWeeks.map((x, i) => { return (
        <ScheduleWeek 
            key={x + i} 
            m={m.clone().add(i, 'w')}
            month={month} />
      )})}
    </div>
  );
}

export default ScheduleCalendar;