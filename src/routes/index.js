import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from '../components/sub/Header';
import Home from '../pages/Home';
import User from '../pages/User';

class AppRoutes extends Component {
  render() {
    const contentPadding = {
      width: '80%',
      margin: 'auto'
    }
    return (
      <Fragment>
        <Header />
        <div style={contentPadding}>
          <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:userId" component={User} />
          </Router>
        </div>
      </Fragment>
    );
  }
}

export default AppRoutes;
