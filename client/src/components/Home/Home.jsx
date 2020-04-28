import React, { Component } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="carousel">
          <Carousel>
            <div>
              <img src={process.env.PUBLIC_URL + "/1.jpg"} />
            </div>
            <div>
              <img src={process.env.PUBLIC_URL + "/2.jpg"} />
            </div>
            <div>
              <img src={process.env.PUBLIC_URL + "/3.jpg"} />
            </div>
          </Carousel>
        </div>
        <div className="homePage">
            
        </div>
      </React.Fragment>
    );
  }
}
