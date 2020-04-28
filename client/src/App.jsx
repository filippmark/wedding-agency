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

class App extends Component {

  state = {
    isAuthorised: true
  }

  setAuthorised = (isAuthorised) => {
    this.setState({
      isAuthorised
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AuthContext.Provider value={{ isAuthorised: this.state.isAuthorised, setAuthorised: this.setAuthorised }}>
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/" render={props => <Home {...props}></Home>}/>
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