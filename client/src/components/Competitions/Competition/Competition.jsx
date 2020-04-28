import React, { Component } from "react";
import { CardSubtitle, Card, CardText, Button, CardTitle, CardBody, CardImg } from "reactstrap";
import "./Competition.css";
import axios from "axios";
import {AuthContext} from '../../../context';

export default class Competition extends Component {

  static contextType = AuthContext;

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
      <Card>
        <CardImg
          top
          width="100%"
          src="https://reactstrap.github.io/assets/318x180.svg"
          alt={this.state.name}
        />
        <CardBody>
          <CardTitle>Название: {this.state.name}</CardTitle>
          <div className="competitionDescription">
            <CardText>Описание: {this.state.description}</CardText>
          </div>
          <CardSubtitle>
            Кол-во участников: {this.state.amountOfParticipants}.
          </CardSubtitle>
          <CardSubtitle>Цена: {this.state.price} руб.</CardSubtitle>
          <div className="addToCart">
            <Button disabled={!this.context.isAuthorised} onClick={this.bookCompetition}>
              {this.state.isBooked ? "Убрать из корзины" : "Добавить в корзину"}
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}
