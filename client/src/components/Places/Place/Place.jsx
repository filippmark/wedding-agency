import React, { Component } from "react";
import {
  CardTitle,
  Card,
  CardText,
  CardImg,
  CardSubtitle,
  Button,
  CardBody,
} from "reactstrap";
import "./Place.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Place extends Component {
  state = {
    ...this.props,
    clicked: false,
  };

  bookPlace = async () => {
    try {
      let response;

      if (!this.state.isBooked) {
        response = await axios.post(
          "http://localhost:8080/basket/setPlace",
          {
            placeId: this.state._id,
          },
          { withCredentials: true }
        );
      } else {
        response = await axios.delete(
          `http://localhost:8080/basket/unsetPlace`,
          { withCredentials: true }
        );
      }

      this.setState({
        ...this.state,
        clicked: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return this.state.clicked ? (
      <Redirect to="/basket"></Redirect>
    ) : (
      <Card>
        <CardImg
          top
          width="100%"
          src="https://reactstrap.github.io/assets/318x180.svg"
          alt={this.state.name}
        />
        <CardBody>
          <CardTitle>{this.state.name}</CardTitle>
          <div className="address">
            <CardSubtitle>
              {" "}
              Адрес:{" "}
              {this.state.town +
                ", " +
                this.state.street +
                ", " +
                this.state.house}
              .
            </CardSubtitle>
          </div>
          <CardSubtitle> Вместительность: {this.state.volume}.</CardSubtitle>
          <CardSubtitle> Цена: {this.state.price}.</CardSubtitle>
          <div className="addToCart">
            <Button onClick={this.bookPlace}>
              {this.state.isBooked ? "Убрать из корзины" : "Добавить в корзину"}
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}
