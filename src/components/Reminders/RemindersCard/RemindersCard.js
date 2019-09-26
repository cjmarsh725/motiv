import React from 'react';
import './RemindersCard.css';

/*
This component is responsible for displaying reminders. The props passed down to it are a delete function,
the content to display in the reminder, the index in the original array of reminders, a function to be
called on drag, and a function to be called on drop.
*/
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