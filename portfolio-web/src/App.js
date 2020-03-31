import React, { Component, useEffect } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Header from './header/header';
import Menu from './menu/menu';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Ryan Fan</title>
          <meta name="description" content="Ryan Fan is a digital product designer and front-end engineer with a concentration in the practice of user experience design." />
        </Helmet>

        <Header {...this.props} />
        <Menu {...this.props} />
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
