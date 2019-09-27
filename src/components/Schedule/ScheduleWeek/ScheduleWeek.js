import React from 'react';
import ScheduleIndicator from '../ScheduleIndicator/ScheduleIndicator';
import './ScheduleWeek.css';

/*
This component is responsible for displaying the row of days for each week in the calendar.
The props passed down from the ScheduleCalendar component include the moment object from the
calendar, the month, the current date, the selected date, the entire schedule, and a function
to set which date is the selected date. Styling is adjusted for each day based on whether or
not the day is in the current month, selected, or the current day. The ScheduleIndicator
component is used to show how many appointments are on a given day.
*/
const ScheduleWeek = props => {
  const weekDays = Array(7).fill("Schedule Day ");
  return (
    <div className="scheduleweek-container">
      {weekDays.map((x, i) => { 
        const dayMoment = props.m.clone().add(i, 'd');
        return (
          <div key={x + i} className="scheduleweek-day" onClick={() => props.setSelected(dayMoment)}>
            <div className={"scheduleweek-day-interior" + 
                (props.month !== dayMoment.format('MMMM') ? " scheduleweek-offday" : "") + 
                (props.selected === dayMoment.format('MM-DD-YYYY') ? " scheduleweek-selectedday" : "") + 
                (props.now === dayMoment.format('MM-DD-YYYY') ? " scheduleweek-currentday" : "")}>
                {dayMoment.format('D')}
                <ScheduleIndicator schedule={props.schedule} m={dayMoment}/>
            </div>
          </div>
      );})}
    </div>
  );
}

export default ScheduleWeek;