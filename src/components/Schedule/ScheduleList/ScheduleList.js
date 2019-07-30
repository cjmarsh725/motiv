import React, { Component } from 'react';
import moment from 'moment';
import './ScheduleList.css';

class ScheduleList extends Component {
  getSubtitle = () => {
    let subtitle = "Upcoming appointments:";
    if (!this.props.mNow.isSame(this.props.mSelected, "day")) {
      subtitle = "Appointments on or after " + this.props.mSelected.format("MMMM Do YYYY");
    }
    return subtitle;
  }

  render() {
    return (
      <div className="schedulelist-container">
        <div className="schedulelist-header">
          {"Today is " + this.props.mNow.format("dddd, MMMM Do YYYY")}
          <div className="schedulelist-header-subtitle">{this.getSubtitle()}</div>
        </div>
        <div className="schedulelist-list">
          {this.props.schedule.map(item => {
            const itemMoment = moment(item.date, "MM-DD-YYYY");
            const itemTime = itemMoment.format("dddd, MMMM Do YYYY") + " at " + item.startTime;
            if (itemMoment.isSameOrAfter(this.props.mSelected, "day")) {
              return (
                <div key={itemTime} className="schedulelist-item">
                  <div className="schedulelist-item-title">{item.title}</div>
                  <div className="schedulelist-item-date">
                    {itemTime}
                  </div>
                </div>
              );
            } else return null;
          })}
        </div>
      </div>
    );
  }
}

export default ScheduleList;