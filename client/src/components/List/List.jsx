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

  getItems = async (page) => {
    try {
      let response = await axios.get(this.props.endpoint + page.toString(), {
        withCredentials: true,
      });

      this.setState({
        ...this.state,
        items: this.state.items.concat(response.data.items),
        pagesCount: response.data.pagesCount,
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  };
  loadMore = () => {
    this.getItems(this.state.currentPage + 1);
  };

  componentDidMount() {
    this.getItems(1);
  }

  render() {
    const { Item } = this.props;

    return (
      <div>
        <div className="items">
          {this.state.items.map((item) => {
            return (
              <div key={item._id} className="item">
                <Item
                  {...item}
                  saveNewItem={this.saveNewItem}
                  deleteItem={this.deleteItem}
                ></Item>
              </div>
            );
          })}
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
