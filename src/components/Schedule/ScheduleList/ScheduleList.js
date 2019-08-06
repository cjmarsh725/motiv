import React, { Component } from 'react';
import moment from 'moment';
import './ScheduleList.css';

class ScheduleList extends Component {
  state = {
    isAddOpen: false,
    isDeleteOpen: false,
  }
  
  // Helper functions to toggle the modal visibility state
  toggleAddModal = () => {
    this.setState({ isAddOpen: !this.state.isAddOpen });
  }
  toggleDeleteModal = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  }

  getSubtitle = () => {
    let subtitle = "Upcoming appointments:";
    if (!this.props.mNow.isSame(this.props.mSelected, "day")) {
      subtitle = "Appointments on or after " + this.props.mSelected.format("MMMM Do YYYY") + ":";
    }
    return subtitle;
  }

  render() {
    return (
      <div className="schedulelist-container">
        <div className="schedulelist-buttons-container">
          <div className="schedulelist-add-btn" onClick={this.toggleAddModal}>
            <i className="fas fa-plus fa-2x"></i>
          </div>
          <div className="schedulelist-delete-btn" onClick={this.toggleDeleteModal}>
            <i className="fas fa-trash fa-2x"></i>
          </div>
        </div>
        <div className="schedulelist-header">
          {"Today is " + this.props.mNow.format("dddd, MMMM Do YYYY")}
          <div className="schedulelist-header-subtitle">{this.getSubtitle()}</div>
        </div>
        <div className="schedulelist-list">
          {this.props.schedule.map(item => {
            const itemMoment = moment(`${item.date} ${item.startTime}`, "MM-DD-YYYY h:mm a");
            const itemTime = itemMoment.format("dddd, MMMM Do YYYY") + " at " + item.startTime;
            const isAfterMoment = this.props.mNow.isSame(this.props.mSelected, "day") ?
                  itemMoment.isSameOrAfter(this.props.mNow, "minute") :
                  itemMoment.isSameOrAfter(this.props.mSelected, "day");
            if (isAfterMoment) {
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