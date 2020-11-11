import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link,
} from "react-router-dom";
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import SignUp from './SignUp.js';


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path='/'
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path='/login'
              exact
              render={(routerProps) => <Login {...routerProps} />}
            />
            <Route
              path='/signup'
              exact
              render={(routerProps) => <SignUp {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}
