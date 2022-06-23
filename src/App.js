import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PetList from './PetList';
import PetEdit from "./PetEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/pets' exact={true} component={PetList}/>
            <Route path='/pets/:id' component={PetEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;