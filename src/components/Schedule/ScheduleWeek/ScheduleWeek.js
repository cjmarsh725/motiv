import React from 'react';
import ScheduleIndicator from '../ScheduleIndicator/ScheduleIndicator';
import './ScheduleWeek.css';

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
                <ScheduleIndicator />
            </div>
          </div>
      );})}
    </div>
  );
}

export default ScheduleWeek;