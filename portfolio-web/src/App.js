import React, { Component } from 'react';
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
          <meta name="description" content="Ryan Fan is a designer uniting design and engineering to create thoughtful digital products." />
        </Helmet>

        <Header {...this.props} />
        <Menu {...this.props} />
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
