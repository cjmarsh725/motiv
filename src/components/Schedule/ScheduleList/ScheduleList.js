import React, { Component } from 'react';
import moment from 'moment';
import Modal from '../../Modal/Modal';
import ModalAddAppointment from '../../Modal/ModalAddAppointment/ModalAddAppointment';
import ModalDeleteAppointment from '../../Modal/ModalDeleteAppointment/ModalDeleteAppointment';
import './ScheduleList.css';

/*
Displays the appointments in the schedule as a list of items. Only appointments that come after
the selected date will be shown. Modals for adding and deleting an appointment also live here. 
The props passed down to this component are the current and selected moment objects, the schedule,
and functions to add and delete appointments.
*/
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

  // Helper function to get the subtitle based on whether it is the current date
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
        {/* Header contains the date and a subtitle plus buttons to add or delete an appointment */}
        <div className="schedulelist-header-container">
          <div className="schedulelist-header">
            {"Today is " + this.props.mNow.format("dddd, MMMM Do YYYY")}
            <div className="schedulelist-header-subtitle">{this.getSubtitle()}</div>
          </div>
          <div className="schedulelist-buttons-container">
            <div className="schedulelist-add-btn" onClick={this.toggleAddModal}>
              <i className="fas fa-plus fa-2x"></i>
            </div>
            <div className="schedulelist-delete-btn" onClick={this.toggleDeleteModal}>
              <i className="fas fa-trash fa-2x"></i>
            </div>
          </div>
        </div>
        <div className="schedulelist-list">
          {this.props.schedule.map(item => {
            // First parse the moment from the date of the appointment
            const itemMoment = moment(item.date, "MM-DD-YYYY h:mm A");
            // Then format the date for display
            const itemTime = itemMoment.format("dddd, MMMM Do YYYY [at] h:mm A");
            // Check whether the date is after the selected or current day
            const isAfterMoment = this.props.mNow.isSame(this.props.mSelected, "day") ?
                  itemMoment.isSameOrAfter(this.props.mNow, "minute") :
                  itemMoment.isSameOrAfter(this.props.mSelected, "day");
            // Return an item only if its after the current or selected day
            if (isAfterMoment) {
              return (
                <div key={itemTime} className="schedulelist-item">
                  <div className="schedulelist-item-label">{item.label}</div>
                  <div className="schedulelist-item-date">{itemTime}</div>
                </div>
              );
            } else return null;
          })}
        </div>
        {/* Modals for adding an deleting an appointment */}
        <Modal 
            isOpen={this.state.isAddOpen} 
            toggle={this.toggleAddModal}>
          <ModalAddAppointment 
              toggle={this.toggleAddModal}
              addAppointment={this.props.addAppointment}/>
        </Modal>
        <Modal 
            isOpen={this.state.isDeleteOpen} 
            toggle={this.toggleDeleteModal}>
          <ModalDeleteAppointment 
              toggle={this.toggleDeleteModal}
              schedule={this.props.schedule}
              deleteAppointment={this.props.deleteAppointment}/>
        </Modal>
      </div>
    );
  }
}

export default ScheduleList;