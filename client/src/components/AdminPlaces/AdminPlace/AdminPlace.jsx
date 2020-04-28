import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Button,
  Card,
} from "reactstrap";
import "./AdminPlace.css";
import axios from "axios";

export default class AdminCompetition extends Component {
  state = {
    isChanged: this.props.isChanged,
    files: [],
    name: "",
    town: "",
    street: "",
    house: 0,
    volume: 0,
    price: 0,
    ...this.props,
  };

  handleUpdate = (event) => {
    event.preventDefault();

    const item = {
      _id: this.state._id,
      name: this.state.name,
      town: this.state.town,
      street: this.state.street,
      house: this.state.house,
      volume: this.state.volume,
      price: this.state.price,
    };
    this.props.saveNewItem(item, this.state.isNew);

    this.setState({
      ...this.state,
      isChanged: false,
    });
  };

  handleFileChange = (event) => {
    this.setState({
      ...this.state,
      files: this.state.files[0],
    });
  };

  updateFile = (event) => {
    let formData = new FormData();
    formData.append("file", this.files);
    try {
      let response = axios.post("http://localhost:8080/place/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  delete = () => {
    this.props.deleteItem(this.state._id, this.state.isNew);
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      isChanged: true,
    });
  };

  render() {
    return (
      <Card className="adminPlace">
        <div className="deleteWrapper">
          <Button close onClick={this.delete}></Button>
        </div>
        <Form>
          <FormGroup>
            <Label for="name"> Название: </Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="town"> Город: </Label>
            <Input
              type="text"
              name="town"
              id="town"
              value={this.state.town}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="street"> Улица: </Label>
            <Input
              type="text"
              name="street"
              id="street"
              value={this.state.street}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="house"> Дом: </Label>
            <Input
              type="number"
              name="house"
              id="house"
              value={this.state.house}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="volume"> Вместительность: </Label>
            <Input
              type="number"
              name="volume"
              id="volume"
              value={this.state.volume}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="file">File</Label>
            <Input
              type="file"
              name="imagePath"
              id="file"
              onClick={this.handleFileChange}
            />
            <div className="uploadPhoto">
              <Button disabled={this.state.files.length === 0}>
                Загрузить фото
              </Button>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="volume"> Цена: </Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            disabled={
              !(
                !!this.state.name &&
                !!this.state.town &&
                !!this.state.street &&
                !!this.state.house &&
                !!this.state.volume &&
                !!this.state.price
              ) || !this.state.isChanged
            }
            onClick={this.handleUpdate}
          >
            Обновить
          </Button>
        </Form>
      </Card>
    );
  }
}
