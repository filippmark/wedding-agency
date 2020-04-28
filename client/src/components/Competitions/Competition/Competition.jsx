import React, { Component } from "react";
import { CardSubtitle, Card, CardText, Button, CardTitle } from "reactstrap";
import "./Competition.css";
import axios from "axios";

export default class Competition extends Component {
  state = {
    ...this.props,
  };

  bookCompetition = async () => {
    try {
      let response;

      if (!this.state.isBooked) {
        response = await axios.post(
          "http://localhost:8080/basket/addItem",
          {
            competitionId: this.state._id,
          },
          { withCredentials: true }
        );
      } else {
        response = await axios.delete(
          `http://localhost:8080/basket/removeItem/${this.state._id}`,
          { withCredentials: true }
        );
      }

      console.log(response);

      this.setState({
        ...this.state,
        isBooked: !this.state.isBooked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Card body>
        <CardTitle>{this.state.name}</CardTitle>
        <div className="competitionDescription">
          <CardText>{this.state.description}</CardText>
        </div>
        <CardSubtitle>
          Кол-во участников: {this.state.amountOfParticipants}.
        </CardSubtitle>
        <CardSubtitle>Цена: {this.state.price} руб.</CardSubtitle>
        <div className="addToCart">
          <Button onClick={this.bookCompetition}>
            {this.state.isBooked ? "Убрать из корзины" : "Добавить в корзину"}
          </Button>
        </div>
      </Card>
    );
  }
}
