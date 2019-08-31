import React from 'react';
import './RemindersCard.css';

const RemindersCard = props => {
  return (
    <div className="reminderscard"
          draggable
          onDrag={props.drag}
          onDrop={() => props.drop(props.index)}
          onDragEnter={e => e.preventDefault()}
          onDragOver={e => e.preventDefault()}>
      <div className="reminderscard-close-btn" onClick={props.delete}>x</div>
      <div className="reminderscard-content">{props.content}</div>
    </div>
  );
}

export default RemindersCard;