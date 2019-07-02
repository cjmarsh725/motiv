import React from 'react';
import './ModalDeleteEntry.css';

const ModalDeleteEntry = props => {
  return (
    <div className="modaldeleteentry-container">
      <div className="modaldeleteentry-title">
        Are you sure you want to permanently delete this item?
      </div>
      <div className="modaldeleteentry-btns">
        <div className="modaldeleteentry-cancel-btn"
             onClick={props.toggle}>
          Cancel
        </div>
        <div className="modaldeleteentry-delete-btn"
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