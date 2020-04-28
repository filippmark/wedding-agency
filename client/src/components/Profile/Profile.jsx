import React, { Component } from "react";
import { AuthContext } from "../../context";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Table } from "reactstrap";
import "./Profile.css";

export default class Profile extends Component {
  static contextType = AuthContext;

  state = {
    orders: [],
  };

  getOrders = async () => {
    try {
      let response = await axios.get("http://localhost:8080/order/", {
        withCredentials: true,
      });

      this.setState({
        orders: response.data,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getOrders();
  }

  render() {
    if (this.context.isAuthorised) {
      return (
        <div className="profile">
          <Table  >
            <thead>
              <tr>
                <th> # </th>
                <th> Кол-во конкурсов </th>
                <th> Место проведения </th>
                <th> Тариф </th>
                <th> Цена </th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{order.amountOfItems}</td>
                    <td>{order.placeId.name}</td>
                    <td>{order.rateId.name}</td>
                    <td>{order.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <Redirect to="sign-in"></Redirect>;
    }
  }
}
