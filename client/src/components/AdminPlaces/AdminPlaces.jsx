import React, { Component } from "react";
import AdminPlace from "./AdminPlace/AdminPlace";
import AdminList from "../AdminList/AdminList";
import { AuthContext } from "../../context";
import { Redirect } from "react-router-dom";

export default class AdminPlaces extends Component {
  static contextType = AuthContext;

  render() {
    if (this.context.isAuthorised  && this.context.isAdmin) {
      return (
        <React.Fragment>
          <AdminList
            {...this.props}
            endpoint={"http://localhost:8080/place/"}
            Item={AdminPlace}
          ></AdminList>
        </React.Fragment>
      );
    } else {
      return <Redirect to="/"></Redirect>;
    }
  }
}
