import React from 'react';
import './RemindersCard.css';

const RemindersCard = props => {
  return (
    <div className="reminderscard">
      <div className="reminderscard-close-btn" onClick={props.delete}>x</div>
      <div className="reminderscard-content">{props.content}</div>
    </div>
  );
}

export default RemindersCard;