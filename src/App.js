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
import Todos from './Todos.js';
import PrivateRoute from './PrivateRoute.js';


export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUsername = (boogerToken, boogerUsername) => {
    localStorage.setItem('TOKEN', boogerToken);
    localStorage.setItem('USERNAME', boogerUsername);

    this.setState({
      username: boogerUsername,
      token: boogerToken
    })
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: ''
    })
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            {this.state.token
              ? <div><button onClick={this.logOut}>Log Out</button></div>
              : <div>
                  <Link to="/login"><div>Log In</div></Link>
                  <Link to="/signup"><div>Sign Up</div></Link>
                </div>
            }
          </ul>
          <Switch>
            <Route
              path='/'
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path='/login'
              exact
              render={(routerProps) => <Login {...routerProps} 
              changeTokenAndUsername={this.changeTokenAndUsername} />}
            />
            <Route
              path='/signup'
              exact
              render={(routerProps) => <SignUp {...routerProps}
              changeTokenAndUsername={this.changeTokenAndUsername} />}
            />
            <PrivateRoute
              path='/todos'
              exact
              token={this.state.token} 
              render={(routerProps) => <Todos {...routerProps}
              token={this.state.token} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}
