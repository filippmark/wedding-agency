import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  FormText,
} from "reactstrap";
import axios from "axios";
import "./AdminCompetition.css";

export default class AdminCompetition extends Component {
  state = {
    isChanged: false,
    name: "",
    description: "",
    amountOfParticipants: 0,
    price: 0,
    ...this.props,
    files: [],
  };

  handleUpdate = (event) => {
    event.preventDefault();

    const competition = {
      _id: this.state._id,
      name: this.state.name,
      description: this.state.description,
      amountOfParticipants: this.state.amountOfParticipants,
      price: this.state.price,
    };
    this.props.saveNewItem(competition, this.state.isNew);

    this.setState({
      ...this.state,
    });
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
      let response = axios.post(
        "http://localhost:8080/competition/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Card className="adminCompetition">
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
            <Label for="description"> Описание: </Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="amountOfParticipants"> Кол-во участников </Label>
            <Input
              type="number"
              name="amountOfParticipants"
              id="amountOfParticipants"
              value={this.state.amountOfParticipants}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price"> Цена </Label>
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
                !!this.state.description &&
                !!this.state.amountOfParticipants &&
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
