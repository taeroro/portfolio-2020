import React, { Component } from 'react';
import './menu.css';
import { Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import gsap from 'gsap';


export default class Menu extends Component {
  targetRef = React.createRef();
  targetElement = null;

  constructor(props) {
    super(props);

    this.state = {
      path: "/",
      isMenuExpanded: false,
      windowWidth: 0,
      windowHeight: 0,
    };

    this.tl = gsap.timeline({ paused: true, onReverseComplete: this.hideTargetElement });

    this.menuRef = null;
    this.menuOverlayRef = null;
    this.rt1Ref = null;
    this.rt2Ref = null;
    this.rt3Ref = null;
    this.menuLabelRef = null;
    this.menuContentRef = null;
    this.menuAnimateRef = null;
    this.menuAnimateRef1 = null;

    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });

    window.addEventListener('resize', this.updateWindowDimensions);

    this.targetElement = this.targetRef.current;

    this.tl.set([this.rt1Ref, this.rt2Ref, this.rt3Ref], {transformOrigin: "50% 50%"});

    let cWidth = window.innerWidth <= 768 ? "100vw" : "85vw";

    this.tl
      .to(this.menuAnimateRef, {duration: 0.5, width: cWidth, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"})
      .to(this.menuAnimateRef1, {duration: 0.25, width: cWidth, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25")
      .to(this.menuRef, {duration: 0.5, width: cWidth, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25")
      .set(this.menuOverlayRef, {pointerEvents: "auto"})
      .to(this.rt2Ref, {duration: 0.5, opacity: '0', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5")
      .to(this.rt1Ref, {duration: 0.5, y: 8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5")
      .to(this.rt3Ref, {duration: 0.5, y: -8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5")
      .to(this.rt1Ref, {duration: 0.25, rotate: -45, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"})
      .to(this.rt3Ref, {duration: 0.25, rotate: 45, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25")
      .to(this.menuLabelRef, {duration: 0.5, text: {value: "CLOSE", delimiter: " "}, ease: "none"}, "-=0.5")
      .to(this.menuContentRef, {duration: 0.5, display: "flex", opacity: 1, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5")
      // .to(this.menuRef, {duration: 0.5, boxShadow: '-10px 0px 20px rgba(0,0,0,0.5)', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"} , "-=0.35")
      .to(this.menuOverlayRef, {duration: 0.5, opacity: '0.7', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5")
      .reverse();
  }

  componentWillMount() {
    this.setState({ path: this.props.location.pathname });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.location.pathname });
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  showTargetElement = () => {
    disableBodyScroll(this.targetElement);
  };

  hideTargetElement = () => {
    enableBodyScroll(this.targetElement);
  }


  // when user clicked the menu button
  toggleMenu() {
    this.tl.reversed(!this.tl.reversed());

    if (!this.state.isMenuExpanded) {
      this.showTargetElement();
    }
    else {

    }

    this.setState({ isMenuExpanded: !this.state.isMenuExpanded });
  }


  renderMenuContent() {
    return (
      <div
        className={this.state.isMenuExpanded ? "menu-content-container" : "menu-content-container hidden"}
        ref={div => this.menuContentRef = div}
      >
        <div className="title-wrapper">
          <a className="title" href="/">WORK</a>
        </div>

        <div className="project-name-wrapper">
          <Link
            className={this.state.path.includes("/work/fourtwenty") ? "project-name active" : "project-name"}
            // href="/work/jazzin"
            to={{
              pathname: "/work/fourtwenty"
            }}
            onClick={this.toggleMenu}
          >
            FOUR TWENTY
          </Link>
        </div>

        <div className="project-name-wrapper">
          <Link
            className={this.state.path.includes("/work/jazzin") ? "project-name active" : "project-name"}
            // href="/work/jazzin"
            to={{
              pathname: "/work/jazzin"
            }}
            onClick={this.toggleMenu}
          >
            JAZZIN
          </Link>
        </div>

        <div className="project-name-wrapper">
          <Link
            className={this.state.path.includes("/work/focused") ? "project-name active" : "project-name"}
            // href="/work/focused"
            to={{
              pathname: "/work/focused"
            }}
            onClick={this.toggleMenu}
          >
            FOCUSED.
          </Link>
        </div>

        <div className="project-name-wrapper">
          <Link
            className={this.state.path.includes("/work/apark") ? "project-name active" : "project-name"}
            to={{
              pathname: "/work/apark"
            }}
            onClick={this.toggleMenu}
          >
            αPARK
          </Link>
        </div>

        <div className="project-name-wrapper">
          <Link
            className={this.state.path.includes("/work/faces") ? "project-name active" : "project-name"}
            // href="/work/faces"
            to={{
              pathname: "/work/faces"
            }}
            onClick={this.toggleMenu}
          >
            FACES OF THE PORTRAITS
          </Link>
        </div>

        <div className="project-name-wrapper">
          <Link
            className={this.state.path.includes("/work/yintechlabs") ? "project-name active" : "project-name"}
            // href="/work/yintechlabs"
            to={{
              pathname: "/work/yintechlabs"
            }}
            onClick={this.toggleMenu}
          >
            YINTECH LABS
          </Link>
        </div>

        <div className="title-wrapper">
          <Link className="title" to={{pathname: "/about"}} onClick={this.toggleMenu}>ABOUT</Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="menu-overlay-container" ref={this.targetRef}>
        <div className="menu-bg-animate" ref={div => this.menuAnimateRef = div}></div>
        <div className="menu-bg-animate-1" ref={div => this.menuAnimateRef1 = div}></div>

        <div
          className="menu-overlay"
          ref={div => this.menuOverlayRef = div}
          onClick={this.state.isMenuExpanded ? this.toggleMenu: () => {}}>
        </div>
        <div
          // className="menu-container"
          className={
            this.state.path.match(/.*work.+/) || this.state.windowWidth <= 768
            ?
              !this.state.isMenuExpanded ? "menu-container menu-compact" : "menu-container menu-compact compact-expand"
            :
              "menu-container"
          }
          ref={div => this.menuRef = div}
        >
          <div className="menu-button-wrapper" onClick={this.toggleMenu}>
            <div className="menu-bt">
              <div className="menu-bt-rt-1" ref={div => this.rt1Ref = div}></div>
              <div className="menu-bt-rt-2" ref={div => this.rt2Ref = div}></div>
              <div className="menu-bt-rt-3" ref={div => this.rt3Ref = div}></div>
            </div>

            <span ref={span => this.menuLabelRef = span}>MENU</span>
          </div>
        </div>

        {this.renderMenuContent()}
      </div>
    );
  }
}
