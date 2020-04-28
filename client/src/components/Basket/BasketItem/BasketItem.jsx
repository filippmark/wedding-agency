import React, { Component } from "react";
import { Button } from "reactstrap";
import "./BasketItem.css";
import axios from "axios";

export default class BasketItem extends Component {
  delete = async () => {
    try {
      let response = await axios.delete(
        `http://localhost:8080/basket/removeItem/${this.props._id}`,
        { withCredentials: true }
      );

      this.props.delete(this.props.idForDel);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <tr>
        <td scope="row">{this.props.name}.</td>
        <td>{this.props.price}р.</td>
        <td>
          <Button close onClick={this.delete}></Button>
        </td>
      </tr>
    );
  }
}
