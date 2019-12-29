import React, { Component } from 'react';
import './header.css';

const logo_path = './logo-new.svg';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
    };
  }

  render() {
    return (
      <nav className="header-container">
        <div className="header-desktop">
          <div className="logo-wrapper">
            <a href="/">
              <img src={logo_path} alt="logo" />
            </a>
          </div>

          {
            this.state.path !== ""
            &&
            <div className="back-button">
              <a href="">
                &#8598; BACK
              </a>
            </div>
          }
        </div>
      </nav>
    );
  }
}
