import React, { Component } from "react";
import AdminCompetition from "./AdminCompetition/AdminCompetition";
import AdminList from "../AdminList/AdminList";

export default class AdminCompetitions extends Component {
  
  render() {
    return (
      <React.Fragment>
        <AdminList endpoint={'http://localhost:8080/competition/'} Item={AdminCompetition}></AdminList>
      </React.Fragment>
    );
  }
}
