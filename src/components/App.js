import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./Home";
import Callback from './Callback';
import Auth from './Auth';

export default class App extends Component {
  render() {
    return (
      <div className="app--full-height">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/auth" component={Auth} />
            <Redirect exact from="/" to="auth" />
          </Switch>
        </Router>
      </div>
    );
  }
}