import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import "./List.css";

export default class List extends Component {
  state = {
    currentPage: 1,
    pagesCount: 1,
    items: [],
  };

  getCompetitions = async (page) => {
    try {
      let response = await axios.get(this.props.endpoint + page.toString(), {
        withCredentials: true,
      });

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
        <div className="items">
          {this.state.items.map((item) => {
            return (
              <div className="item">
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
