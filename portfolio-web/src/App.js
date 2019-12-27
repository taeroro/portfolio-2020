import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';

import Header from './header/header';
import Menu from './menu/menu';

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
    </div>
  );
}

export default withRouter(App);
