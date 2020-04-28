import React, { Component } from "react";
import axios from "axios";
import "./Basket.css";
import BasketItem from "./BasketItem/BasketItem";
import {
  Table,
  ListGroupItem,
  ListGroup,
  Button,
  ButtonGroup,
} from "reactstrap";

export default class Basket extends Component {
  state = {
    price: 0,
    placeId: null,
    rate: null,
    items: [],
    rates: [],
    coefficient: 1,
  };

  getBasketInfo = async () => {
    try {
      let response = await axios("http://localhost:8080/basket", {
        withCredentials: true,
      });

      this.setState({
        ...this.state,
        price: response.data.basket.price.toFixed(2),
        placeId: response.data.basket.placeId,
        items: response.data.items,
        rate: response.data.basket.rateId,
        coefficient: response.data.basket.coefficient,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  getRates = async () => {
    try {
      let response = await axios.get("http://localhost:8080/rate", {
        withCredentials: true,
      });

      this.setState({
        ...this.state,
        rates: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteItem = (id) => {
    const items = [...this.state.items];

    const index = items.findIndex((el) => el._id === id);

    items.splice(index, 1);

    let price = 0;

    items.forEach((item) => {
      price += item.price;
    });

    this.setState({
      ...this.state,
      items,
      price: price.toFixed(2),
    });
  };

  setCoef = async (id, coefficient) => {
    try {
      let response = await axios.post(
        "http://localhost:8080/basket/setRate",
        { rateId: id },
        { withCredentials: true }
      );

      let price = 0;

      this.state.items.forEach((item) => {
        price += item.competitionId.price;
      });

      this.setState({
        ...this.state,
        rate: id,
        price: (price * coefficient).toFixed(2),
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  createOrder = async () => {
      try {

        let response = await axios.post('http://localhost:8080/order');

        console.log(response);
        
      } catch (error) {
          console.log(error);
      }
  }

  componentDidMount() {
    this.getBasketInfo();
    this.getRates();
  }

  render() {
    return (
      <div className="basket">
        <div className="basket__items">
          <div className="basket__items__heading">Выбранные конкурсы</div>
          <Table striped hover>
            <thead>
              <tr>
                <th> Наименование </th>
                <th> Цена </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map((item) => {
                return (
                  <BasketItem
                    key={item._id}
                    delete={this.deleteItem}
                    idForDel={item._id}
                    {...item.competitionId}
                  ></BasketItem>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="placePrice">
          <div className="placeDescription">
            <ListGroup>
              <ListGroupItem> Место</ListGroupItem>
              <ListGroupItem>
                {" "}
                Название: {this.state.placeId ? this.state.placeId.name : ""}
              </ListGroupItem>
              <ListGroupItem>
                {" "}
                Вместительность:{" "}
                {this.state.placeId ? this.state.placeId.volume : ""}
              </ListGroupItem>
              <ListGroupItem>
                {" "}
                Цена:{" "}
                {this.state.placeId ? `${this.state.placeId.price}р.` : ""}
              </ListGroupItem>
            </ListGroup>
          </div>
          <div className="price">
            <div className="coefs">
              <div>
                <ButtonGroup>
                  {this.state.rates.map((el) => {
                    return (
                      <Coef
                        selectedRate={this.state.rate}
                        key={el._id}
                        setCoef={this.setCoef}
                        {...el}
                      ></Coef>
                    );
                  })}
                </ButtonGroup>
              </div>
            </div>
            <div className="makeOffer">
              <div className="priceNumber">Цена: {this.state.price}р.</div>
              <Button disabled={!!this.state.rate || !!this.state.placeId} onClick={this.createOrder}> Заказать </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Coef extends Component {
  handleClick = (event) => {
    this.props.setCoef(this.props._id, this.props.coefficient);
  };

  render() {
    return (
      <Button
        active={this.props.selectedRate === this.props._id}
        onClick={this.handleClick}
      >
        {this.props.name}
      </Button>
    );
  }
}
