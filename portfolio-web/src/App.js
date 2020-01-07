import React, { Component, useEffect } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';

import Header from './header/header';
import Menu from './menu/menu';
import Routes from './routes';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header {...this.props} />
          <Menu {...this.props} />
          <Routes />
        </div>
    );
  }
}

export default withRouter(App);
