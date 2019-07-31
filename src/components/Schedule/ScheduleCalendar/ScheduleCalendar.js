import React, { Component } from 'react';
import ScheduleWeek from '../ScheduleWeek/ScheduleWeek';
import './ScheduleCalendar.css';

class ScheduleCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerOpen: false
    }
  }

  togglePicker = () => {
    this.setState({ isPickerOpen: !this.state.isPickerOpen });
  }

  createMonthPicker = () => {
    const props = this.props;
    const months = [["January", "February", "March"], 
                    ["April", "May", "June"],
                    ["July", "August", "September"],
                    ["October", "November", "December"]];
    return (
      months.map((quarter, i) => { return (
        <div key={"Quarter " + i} className="schedulecalendar-picker-month-row">
          {quarter.map(month => { return (
            <div key={month} className="schedulecalendar-picker-month-item"
                onClick={() => { 
                  props.setMonth(month + "-" + props.m.format("YYYY"));
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
    const calendarWeeks = Array(5).fill("Schedule Week ");
    const m = props.m.clone().startOf('month').startOf('week');
    return (
      <div className="schedulecalendar-container">
        {/* Month Picker */}
        <div className={"schedulecalendar-picker-content-container" + 
                          (this.state.isPickerOpen ? "" : " schedulecalendar-picker-closed")}>
          <div className="schedulecalendar-picker-content">
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
        {calendarWeeks.map((x, i) => { return (
          <ScheduleWeek 
              key={x + i} 
              m={m.clone().add(i, 'w')}
              month={props.m.format('MMMM')}
              date={props.mNow.format('MM-DD-YYYY')}
              selected={props.mSelected.format('MM-DD-YYYY')}
              schedule={props.schedule}
              setSelected={props.setSelected} />
        )})}
      </div>
    );
  }
}

export default ScheduleCalendar;