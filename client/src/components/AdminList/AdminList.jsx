import React, { Component } from "react";
import axios from "axios";
import "./AdminList.css";
import { Button } from "reactstrap";

export default class AdminList extends Component {
  state = {
    currentPage: 1,
    pagesCount: 1,
    items: [],
  };

  getCompetitions = async (page) => {
    try {
      let response = await axios.get(
        this.props.endpoint + page.toString(),
        { withCredentials: true }
      );

      this.setState({
        ...this.state,
        items: this.state.items.concat(response.data.competitions),
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
            this.props.endpoint + _id.toString(),
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
          this.props.endpoint,
          {
            ...item,
          },
          { withCredentials: true }
        );
      } else {
        response = await axios.put(
          this.props.endpoint + item._id,
          { ...item },
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
    const { Item } = this.props;

    return (
      <div>
        <div className="adminItems">
          {this.state.items.map((item) => {
            return (
              <div className="adminItem">
                <Item
                  key={item._id}
                  {...item}
                  saveNewItem={this.saveNewItem}
                  deleteItem={this.deleteItem}
                ></Item>
              </div>
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
