import React from 'react';
import './ModalDeleteAccount.css';

/*
Interior modal component for permanently deleting an account and all of its
associated files in the database. Takes in the modal toggle function and deleting 
function as props.
*/
const ModalDeleteAccount = props => {
  return (
    <div className="modaldeleteaccount-container">
      <div className="modaldeleteaccount-title">
        Are you sure you want to permanently delete this item?
      </div>
      <div className="modaldeleteaccount-btns">
        <div className="modal-btn-primary"
             onClick={() => {
               props.deleteNode(props.deletingPath);
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

export default ModalDeleteAccount;