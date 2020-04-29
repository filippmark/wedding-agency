import React, { Component } from "react";
import AdminCompetition from "./AdminCompetition/AdminCompetition";
import AdminList from "../AdminList/AdminList";
import { AuthContext } from "../../context";
import { Redirect } from "react-router-dom";

export default class AdminCompetitions extends Component {
  static contextType = AuthContext;

  render() {
    if(this.context.isAuthorised  && this.context.isAdmin){
      return (
        <React.Fragment>
          <AdminList
            {...this.props}
            endpoint={"http://localhost:8080/competition/"}
            Item={AdminCompetition}
          ></AdminList>
        </React.Fragment>
      );
    } else{
      return (<Redirect to="/"></Redirect>);
    }

  }
}
