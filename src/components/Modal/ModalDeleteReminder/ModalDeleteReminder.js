import React from 'react';
import './ModalDeleteReminder.css';

/*
Interior modal component for deleting a reminder. Toggled when the delete button
in a reminder is clicked. Confirming the delete action calls the function that
removes the reminder from the state where it lives.
*/
const ModalDeleteReminder = props => {
  return (
    <div className="modaldeletereminder-container">
      <div className="modaldeletereminder-title">
        Are you sure you want to permanently delete this reminder?
      </div>
      <div className="modaldeletereminder-btns">
        <div className="modal-btn-primary"
             onClick={() => {
               props.delete();
               props.toggle();
              }}>
          Delete
        </div>
        <div className="modal-btn" onClick={props.toggle}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteReminder;