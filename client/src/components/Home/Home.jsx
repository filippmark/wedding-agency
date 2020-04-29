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
          Мы с радостью станем вашими советчиками и помощниками, возьмем на себя
          все хлопоты предпраздничной суеты и разделим с вами радость Свадебного
          торжества. Мы любим наше дело и наших клиентов! У нас целое море идей
          и задумок, которыми мы будем рады поделиться с Вами. Очень надеемся на
          то, что в скором времени мы вместе создадим еще одну идеальную
          свадьбу, достойную подражания!
        </div>
      </React.Fragment>
    );
  }
}
