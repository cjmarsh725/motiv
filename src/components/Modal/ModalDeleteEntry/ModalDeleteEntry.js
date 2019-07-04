import React from 'react';
import './ModalDeleteEntry.css';

/*
Interior modal component for deleting an entry in the journal. Toggled when
the delete button in the Journal Sidebar is clicked or when an item is dragged
onto it. Takes in the modal toggle function, deleting function, and path to 
delete as props.
*/
const ModalDeleteEntry = props => {
  return (
    <div className="modaldeleteentry-container">
      <div className="modaldeleteentry-title">
        Are you sure you want to permanently delete this item?
      </div>
      <div className="modaldeleteentry-btns">
        <div className="modal-btn"
             onClick={props.toggle}>
          Cancel
        </div>
        <div className="modal-btn-primary"
             onClick={() => {
               props.deleteNode(props.deletingPath);
               props.toggle();
              }}>
          Delete
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteEntry;