import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "bootstrap";
import ClassSchedule from "./Components/ClassSchedule";
import Header from "./Components/Header";

import Cart from "./Components/Cart";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

class App extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="container-fluid">
        <Router>
       
          <Switch>
            <Route exact path="/">
              <ClassSchedule />
            </Route>

            <Route exact path="/classschedule">
              <ClassSchedule />
            </Route>

            <Route exact path="/cart">
              <Cart />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
