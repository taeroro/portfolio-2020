import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';

import Header from './header/header';
import Menu from './menu/menu';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Routes />
    </div>
  );
}

export default withRouter(App);
