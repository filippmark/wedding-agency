import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Places from './components/Places/Places';
import Basket from './components/Basket/Basket';
import Competitions from './components/Competitions/Competitions';
import AdminCompetitions from './components/AdminCompetitions/AdminCompetitions';
import AdminPlaces from './components/AdminPlaces/AdminPlaces';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Navbar from './components/Global/Navbar/Navbar';
import Home from './components/Home/Home';
import { AuthContext } from './context';
import './App.css';
import axios from 'axios';
import Profile from './components/Profile/Profile';

class App extends Component {

  state = {
    isAuthorised: false,
    isAdmin: false,
    email: ''
  }

  setAuthorised = (isAuthorised) => {
    this.setState({
      ...this.state,
      isAuthorised
    });
  }

  setIsAdmin = (isAdmin) => {
    this.setState({
      ...this.state,
      isAdmin
    });
  }

  checkForAuth = async () => {
    try {
      
      let response = await axios.get('http://localhost:8080/isValidToken', {withCredentials: true});

      console.log(response.data);

      this.setState({
        ...this.state,
        email: response.data.email,
        isAdmin: response.data.isAdmin
      });

    } catch (error) {
      this.setState({
        isAuthorised: false
      });
    }
  }

  componentDidMount(){
    this.checkForAuth();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AuthContext.Provider value={{ isAuthorised: this.state.isAuthorised, isAdmin: this.state.isAdmin, setAuthorised: this.setAuthorised, setIsAdmin: this.setIsAdmin }}>
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/" render={props => <Home {...props}></Home>}/>
              <Route path="/profile" render={props => <Profile {...props}></Profile>}/>
              <Route path="/basket" render={props => <Basket {...props}></Basket>}/>
              <Route path="/competitions" render={props => <Competitions {...props}></Competitions>}/>
              <Route path="/places" render={props => <Places {...props}></Places>}/>
              <Route path="/admin-places" render={props => <AdminPlaces {...props}></AdminPlaces>} />
              <Route path="/admin-competitions" render={props => <AdminCompetitions {...props}></AdminCompetitions>} />
              <Route path="/sign-in" render={props => <SignIn {...props}></SignIn>} />
              <Route path="/sign-up" render={props => <SignUp {...props}></SignUp>} />
            </Switch>
          </AuthContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;