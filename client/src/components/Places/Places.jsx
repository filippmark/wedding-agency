import React, { Component } from "react";
import List from "../List/List";
import Place from "./Place/Place";

export default class Places extends Component {
  render() {
    return (
      <React.Fragment>
        <List endpoint={'http://localhost:8080/place/'} Item={Place}></List>
      </React.Fragment>
    );
  }
}
