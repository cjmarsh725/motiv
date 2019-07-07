import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './Home.css';

const imgObjs = [
  { 
    url: "img/amelie-ohlrogge-BkmdKnuAZtw-unsplash.jpg",
    text: "The only difference between an impasse and an opportunity is perspective"
  },
  {
    url: "img/michael-louie-Zw5aEvl5QjA-unsplash.jpg",
    text: "Remember all the work that has already gone into paving your way forward"
  }
]

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        {imgObjs.map(obj => { return (
          <div>
            <Image src={obj.url} fluid />
            <div className="home-obj-text-container">
              <div className="home-obj-text">{obj.text}</div>
            </div>
          </div>
        )})}
      </div>
    );
  }
}

export default Home;