import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './Home.css';

const imgObjs = [
  { 
    url: "img/cliff-",
    text: "The only difference between an impasse and an opportunity is perspective"
  },
  {
    url: "img/road-",
    text: "Work has already gone into paving the way forward"
  },
  {
    url: "img/reflection-",
    text: "Reflection is all that is needed to see the world in a different light"
  },
  {
    url: "img/layers-",
    text: "Life is always more complicated than it seems"
  },
  {
    url: "img/grass-",
    text: "Knowledge inspires awe in even the smallest forms of life"
  },
  {
    url: "img/erosion-",
    text: "The forces that wear us down also make us better"
  },
  {
    url: "img/spiral-",
    text: "Sometimes going in circles leads to progress"
  },
  {
    url: "img/mountain-",
    text: "Every journey to the top of a mountain began with a single step"
  },
  {
    url: "img/welder-",
    text: "The only secret to success is hard work"
  },
  {
    url: "img/bridge-",
    text: "Perseverance while pursuing goals leads to fulfillment"
  },
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLoaded: new Array(imgObjs.length).fill(false),
      imgSize: this.getCurrentSize()
    }
    this.shuffleArray(imgObjs);
  }

  onImageLoad = index => {
    const imgLoaded = [...this.state.imgLoaded];
    imgLoaded[index] = true;
    this.setState({ imgLoaded });
  }

  getCurrentSize = () => {
    let currentSize;
    if (window.innerWidth <= 800) currentSize = "small";
    else if (window.innerWidth <= 1500) currentSize = "medium";
    else currentSize = "large";
    return currentSize;
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
        {imgObjs.map((obj, i) => { return (
          <div key={i} className={"home-obj-container" + (this.state.imgLoaded[i] ? "" : " home-obj-toggle")}>
            <Image 
                src={obj.url + this.state.imgSize + ".jpg"}
                onLoad={() => this.onImageLoad(i)}
                fluid />
            <div className="home-obj-text-container">
              <div className={"home-obj-text" +  (this.state.imgLoaded[i] ? "" : " home-obj-toggle")}>
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