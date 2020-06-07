import * as React from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../../context";
import axios from "axios";

export default class Navmenu extends React.PureComponent {
  static contextType = AuthContext;

  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  signOut = async (event) => {
    event.preventDefault();

    console.log(this.context);

    try {
      const response = await axios.get("http://localhost:8080/signOut", {
        withCredentials: true,
      });

      console.log(response);

      this.context.setAuthorised(false);
      this.context.setIsAdmin(false);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.context.isAdmin);
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              Свадебное агенство
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={this.state.isOpen}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                {!this.context.isAuthorised ? (
                  <React.Fragment>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/competitions"
                      >
                        {" "}
                        Конкурсы{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/places">
                        {" "}
                        Места проведения{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/sign-up">
                        {" "}
                        Зарегистрироваться{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/sign-in">
                        {" "}
                        Войти{" "}
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                ) : this.context.isAdmin ? (
                  <React.Fragment>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/admin-competitions"
                      >
                        {" "}
                        Редактировать конкурсы{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/admin-places"
                      >
                        {" "}
                        Редактировать места проведения{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/"
                        onClick={this.signOut}
                      >
                        {" "}
                        Выйти{" "}
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/competitions"
                      >
                        {" "}
                        Конкурсы{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/places">
                        {" "}
                        Места проведения{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/basket">
                        {" "}
                        Корзина{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/profile">
                        {" "}
                        Список заказов{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/"
                        onClick={this.signOut}
                      >
                        {" "}
                        Выйти{" "}
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                )}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
