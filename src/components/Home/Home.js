import React, { Component } from 'react';
import './Home.css';

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
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
    this.shuffleArray(quotes);
  }

  shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

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