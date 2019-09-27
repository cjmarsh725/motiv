import React, { Component } from 'react';
import moment from 'moment';
import './ScheduleIndicator.css';

/*
This is the helper component for displaying a circle for each appointment up to four when
a bar the length of three circles is shown instead. The schedule is passed in as props
along with the current moment object. The number of circles to display is determined by
the number of scheduled dates that match the passed moment.
*/
class ScheduleIndicator extends Component {
  // Returns the number of matching appointments for the given moment
  getMatchingDates = () => {
    let count = 0;
    this.props.schedule.forEach(item => {
      const date = moment(item.date, "MM-DD-YYYY h:mm A");
      // Compares the dates by day using moment's comparison
      if (date.isSame(this.props.m, "day")) count++;
    });
    return count;
  }

  render() {
    const numDates = this.getMatchingDates();
    // Show nothing when there are no matching dates
    if (numDates === 0) return null;
    return (
      <div className="scheduleindicator">
        {/* Show circles if less than 4 otherwise show the bar */}
        {numDates < 4 ?
          Array(numDates).fill(null).map(x => <div className="scheduleindicator-circle"></div>) :
          <div className="scheduleindicator-bar"></div>
        }
      </div>
    );
  }
}

export default ScheduleIndicator;