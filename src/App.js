import React, { Component } from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import AddUser from './forms/AddUser';
import UpdateUser from './forms/UpdateUser';
import Users from "./components/Users";
import NotFound from './pages/NotFound'


import {
  BrowserRouter as Router, Route,Switch
} from "react-router-dom";


export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar title="User App" />
          <hr />
          
          <Switch>
          <Route exact path="/" component={Users}/>
          <Route exact path="/adduser" component={AddUser}/>
          <Route exact path="/edituser/:id" component={UpdateUser}/>
          <Route component={NotFound}/>
          </Switch>
         
         

        </div>
      </Router>

    )
  }
}
