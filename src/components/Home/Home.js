import React, { Component } from 'react';
import './Home.css';

// An array of famous quotes randomly ordered for the homepage
const quotes = [
  `"The way to get started is to quit talking and begin doing." - Walt Disney`,
  `"The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty." - Winston Churchill`,
  `"Don't let yesterday take up too much of today." - Will Rogers`,
  `"It's not whether you get knocked down, it's whether you get up." - Vince Lombardi`,
  `"We may encounter many defeats but we must not be defeated." - Maya Angelou`,
  `"Whether you think you can or think you can't, you're right." - Henry Ford`,
  `"Security is mostly a superstition. Life is either a daring adventure or nothing." - Helen Keller`,
  `"The only limit to our realization of tomorrow will be our doubts of today." - Franklin D. Roosevelt`,
  `"Creativity is intelligence having fun." - Albert Einstein`,
  `"You are never too old to set another goal or to dream a new dream." - C.S. Lewis`,
  `"There are no secrets to success. It is the result of preparation, hard work, and learning from failure." - Colin Powell`,
  `"You miss 100% of the shots you don't take." - Wayne Gretzky`,
  `"I attribute my success to this: I never gave or took any excuse." – Florence Nightingale`,
  `"The most difficult thing is the decision to act, the rest is merely tenacity." – Amelia Earhart`,
  `"Every strike brings me closer to the next home run." – Babe Ruth`,
  `"You can never cross the ocean until you have the courage to lose sight of the shore." – Christopher Columbus`,
  `"The only person you are destined to become is the person you decide to be." – Ralph Waldo Emerson`,
  `"How wonderful it is that nobody need wait a single moment before starting to improve the world." – Anne Frank`,
  `"If you want to lift yourself up, lift up someone else." – Booker T. Washington`,
  `"It’s not the years in your life that count. It’s the life in your years." – Abraham Lincoln`,
]

/*
The Home route consists of a famous inspirational quote from an array that can be cycled through in either direction.
The starting quote is selected randomly by shuffling the array on initialization. Clicking anywhere on the background,
which is a full-screen image, will cycle through the array of quotes depending on whether the left or right side was
clicked.
*/
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
    this.shuffleArray(quotes);
  }

  // Shuffles an array randomly, used to change the order of quotes displayed
  shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  // Helper function to select the next or previous index, with wrapping at the ends
  changeIndex = delta => {
    let { currentIndex } = this.state;
    if (delta > 0) {
      currentIndex = (currentIndex + delta) % quotes.length;
    } else if (delta < 0) {
      const diff = currentIndex + delta;
      currentIndex = diff >= 0 ? diff : quotes.length + (diff % quotes.length);
    }
    this.setState({ currentIndex });
  }

  // When the left or right side of the screen is clicked the index in the array changes accordingly
  handleClick = e => {
    const side = e.clientX - (window.innerWidth / 2);
    if (side > 0) this.changeIndex(1);
    else this.changeIndex(-1);
  }

  render() {
    return (
      <div className="home-container" onClick={this.handleClick}>
        <div className="home-text">{quotes[this.state.currentIndex]}</div>
      </div>
    );
  }
}

export default Home;