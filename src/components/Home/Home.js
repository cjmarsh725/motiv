import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './Home.css';

const quotes = [
  '"This is an inspiring quote by a famous person." -Famous person',
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

  render() {
    return (
      <div className="home-container">
        <div className="home-text">{quotes[this.state.currentIndex]}</div>
      </div>
    );
  }
}

export default Home;