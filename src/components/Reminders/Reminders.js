import React, { Component } from 'react';
import RemindersCard from './RemindersCard/RemindersCard';
import './Reminders.css';

class Reminders extends Component {
  state = {
    reminders: [
      "Schedule dentist appointment",
      "Talk to Joe about Bob",
      "Go to the grocery store and get milk, eggs, cereal, chips, bread, and soda",
      "Sign up for next meetup",
    ]
  }

  render() {
    return (
      <div className="reminders">
        <div className="reminders-container">
          {this.state.reminders.map((content, i) => <RemindersCard key={content + i} content={content} />)}
        </div>
      </div>
    );
  }
}

export default Reminders;