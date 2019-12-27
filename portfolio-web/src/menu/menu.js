import React, { Component } from 'react';
import './menu.css';

import anime from 'animejs';

export default class Menu extends Component {
  menuRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      path: "",
      isMenuExpanded: false,
      windowWidth: 0,
      windowHeight: 0,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  componentDidUpdate() {
    let animeTimeline = anime.timeline();
    let menuExpandedWidth = (this.state.windowWidth * 0.8).toString();

    let menuAnimation = {
      targets: this.menuRef.current,
      width: {
        value: menuExpandedWidth,
        duration: 500,
        easing: "easeOutCubic"
      },
      easing: "easeOutCubic",
      autoplay: false
    };
    let menuAnimationReverse = {
      targets: this.menuRef.current,
      width: {
        value: '70px',
        duration: 500,
        easing: "easeOutCubic"
      },
      easing: "easeOutCubic",
      autoplay: false
    };

    if (this.state.isMenuExpanded) {
      animeTimeline.add(menuAnimation);
    }
    else {
      animeTimeline.add(menuAnimationReverse);
    }
  }

  // when user clicked the menu button
  toggleMenu() {
    this.setState({ isMenuExpanded: !this.state.isMenuExpanded });
  }

  render() {
    return (
      <div
        className={"menu-container"}
        ref={this.menuRef}
      >
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
