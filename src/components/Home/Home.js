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
    text: "Work has already gone into paving the way forward"
  },
  {
    url: "img/cristina-gottardi-R4y_E5ZQDPg-unsplash.jpg",
    text: "Reflection is all that is needed to see the world in a different light"
  },
  {
    url: "img/robert-baker-IL526pUqQ1k-unsplash.jpg",
    text: "Life is always more complicated than it seems"
  },
  {
    url: "img/erwan-hesry-RNLrB9MU--I-unsplash.jpg",
    text: "Knowledge inspires awe in even the smallest forms of life"
  },
  {
    url: "img/ashley-knedler-OwpgxILRR7c-unsplash.jpg",
    text: "The forces that wear us down also make us better"
  },
  // {
  //   url: "",
  //   text: ""
  // },
  // {
  //   url: "",
  //   text: ""
  // },
  // {
  //   url: "",
  //   text: ""
  // },
]

class Home extends Component {
  state = {
    imgLoaded: new Array(imgObjs.length).fill(false)
  }

  onImageLoad = index => {
    const { imgLoaded } = this.state;
    imgLoaded[index] = true;
    this.setState({ imgLoaded });
  }

  render() {
    return (
      <div className="home-container">
        {imgObjs.map((obj, i) => { return (
          <div key={i}>
            <Image src={obj.url} onLoad={() => this.onImageLoad(i)} fluid />
            <div className="home-obj-text-container">
              <div className={"home-obj-text" +  (this.state.imgLoaded[i] ? 
                              "" : " home-obj-text-toggle")}>
                {obj.text}
              </div>
            </div>
          </div>
        )})}
      </div>
    );
  }
}

export default Home;