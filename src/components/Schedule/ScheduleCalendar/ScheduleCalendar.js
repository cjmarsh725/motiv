import React, { Component } from 'react';
import ScheduleWeek from '../ScheduleWeek/ScheduleWeek';
import './ScheduleCalendar.css';

/*
This is the calendar component of the schedule route. Displays a calendar using the scheduleweek
components along with buttons to cycle through the months and a month picker that allows the user
to select the month and year directly. The props passed to this component include moment objects
to track the day in the calendar, the current date, and the selected date. Other props include
the schedule and functions to change the month and selected day.
*/
class ScheduleCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerOpen: false
    }
  }

  // Similar to a modal the month picker's visibility is toggled here
  togglePicker = () => {
    this.setState({ isPickerOpen: !this.state.isPickerOpen });
  }

  // Helper function to check if the month matches the current date
  isCurrentMonth = date => {
    return this.props.mNow.format("MMMM-YYYY") === date;
  }

  // Returns JSX with a table that allows the user to select a month
  createMonthPicker = () => {
    const props = this.props;
    // Helper array for setting up the month picker based on quarter
    const months = [["January", "February", "March"], 
                    ["April", "May", "June"],
                    ["July", "August", "September"],
                    ["October", "November", "December"]];
    return (
      months.map((quarter, i) => { return (
        <div key={"Quarter " + i} className="schedulecalendar-picker-month-row">
          {quarter.map(month => { 
            const date = month + "-" + props.m.format("YYYY");
            return (
            // Highlighted when its the current month and sets the selected month on click
            <div key={month} 
                className={"schedulecalendar-picker-month-item" + (this.isCurrentMonth(date) ? 
                            " schedulecalendar-picker-month-current" : "")}
                onClick={() => { 
                  props.setMonth(date);
                  this.togglePicker();
                }}>
              {month}
            </div>);
          })}
        </div>
      );})
    )
  }

  render() {
    const props = this.props;
    // Helper array to display five weeks for each month and filled with a string used in the keys
    const calendarWeeks = Array(5).fill("Schedule Week ");
    // The moment object is used to construct the calendar by adding weeks to it in the scheduleweek components
    const m = props.m.clone().startOf('month').startOf('week');
    return (
      <div className="schedulecalendar-container">
        {/* Month Picker */}
        <div className={"schedulecalendar-picker-content-container" + 
                          (this.state.isPickerOpen ? "" : " schedulecalendar-picker-closed")}>
          <div className="schedulecalendar-picker-content">
            {/* Buttons to select the year in the picker */}
            <div className="schedulecalendar-picker-year">
              <div className="schedulecalendar-picker-year-btn" onClick={() => props.changeMonth(-12)}>
                <i className="fas fa-caret-left"></i>
              </div>
              {props.m.format("YYYY")}
              <div className="schedulecalendar-picker-year-btn" onClick={() => props.changeMonth(12)}>
                <i className="fas fa-caret-right"></i>
              </div>
            </div>
            <div className="schedulecalendar-picker-month">
              {this.createMonthPicker()}
            </div>
          </div>
          <div className="schedulecalendar-picker-mask" onClick={this.togglePicker}></div>
        </div>
        {/* Calendar */}
        <div className="schedulecalendar-month">
          {/* Buttons to select the month in the calendar and display the month and year */}
          <div className="schedulecalendar-month-btn" onClick={() => props.changeMonth(-1)}>
            <i className="fas fa-caret-up"></i>
          </div>
          <div className="schedulecalendar-month-label" onClick={this.togglePicker}>
            {props.m.format('MMMM YYYY')}
          </div>
          <div className="schedulecalendar-month-btn" onClick={() => props.changeMonth(1)}>
            <i className="fas fa-caret-down"></i>
          </div>
        </div>
        {/* Five scheduleweek components are added with the moment object used to track the date */}
        {calendarWeeks.map((x, i) => { return (
          <ScheduleWeek 
              key={x + i} 
              m={m.clone().add(i, 'w')}
              month={props.m.format('MMMM')}
              now={props.mNow.format('MM-DD-YYYY')}
              selected={props.mSelected.format('MM-DD-YYYY')}
              schedule={props.schedule}
              setSelected={props.setSelected} />
        )})}
      </div>
    );
  }
}

export default ScheduleCalendar;