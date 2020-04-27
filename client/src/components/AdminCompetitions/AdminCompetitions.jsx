import React, { Component } from "react";
import AdminCompetition from "./AdminCompetition/AdminCompetition";
import axios from "axios";
import "./AdminCompetitions.css";
import { Button } from "reactstrap";

export default class AdminCompetitions extends Component {
  state = {
    currentPage: 1,
    pagesCount: 1,
    items: [],
  };

  getCompetitions = async (page) => {
    try {
      let response = await axios.get(
        `http://localhost:8080/competition/${page}`,
        { withCredentials: true }
      );

      this.setState({
        ...this.state,
        items: this.state.items.concat(
          response.data.competitions
        ),
        pagesCount: response.data.pagesCount,
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  };

  addNewItem = () => {
    const items = [...this.state.items];

    items.push({
      _id: (Date.now() + items.length + 1).toString(),
      name: "",
      description: "",
      amountOfParticipants: 0,
      price: 0,
      isChanged: false,
      isNew: true,
    });

    this.setState({
      ...this.state,
      items,
    });
  };

  deleteItem = async (_id, isNew) => {
    if (!isNew) {
      try {
        let response = axios.delete(
          `http://localhost:8080/competition/${_id}`,
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    }

    const index = this.state.items.findIndex((elem) => {
      return elem._id === _id;
    });

    const items = [...this.state.items];

    items.splice(index, 1);

    this.setState({
      ...this.state,
      items,
    });
  };

  saveNewItem = async (item, isNew) => {
    let response;

    console.log(item);

    try {
      if (isNew) {
        response = await axios.post(
          "http://localhost:8080/competition",
          {
            ...item,
          },
          { withCredentials: true }
        );
      } else {
        response = await axios.put(
          `http://localhost:8080/competition/${item._id}`,
          {...item},
          { withCredentials: true }
        );
      }

      const index = this.state.items.findIndex((elem) => {
        return elem._id === item._id;
      });

      const items = [...this.state.items];

      let updatedItem = items.splice(index, 1)[0];

      updatedItem = {
        ...updatedItem,
        ...item,
        _id: response.data._id,
      };

      items.splice(index, 0, updatedItem);

      this.setState({
        ...this.state,
        items,
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadMore = () => {
    this.getCompetitions(this.state.currentPage + 1);
  };

  componentDidMount() {
    this.getCompetitions(1);
  }

  render() {
    return (
      <div>
        <div className="adminCompetitions">
          {this.state.items.map((competition) => {
            return (
              <AdminCompetition
                key={competition._id}
                {...competition}
                saveNewItem={this.saveNewItem}
                deleteItem={this.deleteItem}
              ></AdminCompetition>
            );
          })}
          <div className="addNewItem">
            <Button onClick={this.addNewItem}> Add </Button>
          </div>
        </div>
        {this.state.pagesCount > 1 && (
          <div className="loadMore" onClick={this.loadMore}>
            <div className="loadMoreText">Eщё</div>
          </div>
        )}
      </div>
    );
  }
}
