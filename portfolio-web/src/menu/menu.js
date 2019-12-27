import React, { Component } from 'react';
import './menu.css';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      isMenuExpanded: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  // when user clicked the menu button
  toggleMenu() {
    this.setState({ isMenuExpanded: !this.state.isMenuExpanded });
  }

  render() {
    return (
      <div className={this.state.isMenuExpanded ? "menu-container menu-open" : "menu-container"}>
        <div className="menu-button-wrapper">
          <div className="menu-bt" onClick={this.toggleMenu}>
            <div className="menu-bt-rt-1"></div>
            <div className="menu-bt-rt-2"></div>
            <div className="menu-bt-rt-3"></div>
          </div>

          <span>MENU</span>
        </div>

      </div>
    );
  }
}
