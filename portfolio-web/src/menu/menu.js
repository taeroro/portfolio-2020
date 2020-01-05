import React, { Component } from 'react';
import './menu.css';
import { Link } from "react-router-dom";

import gsap from 'gsap';
import TextPlugin from "gsap/TextPlugin";

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "/",
      isMenuExpanded: false,
      windowWidth: 0,
      windowHeight: 0,
    };

    this.tl = gsap.timeline();
    this.tlNew = gsap.timeline();
    gsap.registerPlugin(TextPlugin);

    this.menuRef = null;
    this.menuOverlayRef = null;
    this.rt1Ref = null;
    this.rt2Ref = null;
    this.rt3Ref = null;
    this.menuLabelRef = null;
    this.menuContentRef = null;

    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.tl.set([this.rt1Ref, this.rt2Ref, this.rt3Ref], {transformOrigin: "50% 50%"});
  }

  componentWillMount() {
    this.setState({ path: this.props.location.pathname });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.location.pathname });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  // when user clicked the menu button
  toggleMenu() {
    if (!this.state.isMenuExpanded) {
      // this.tl.play();

      this.tl.to(this.menuRef, {duration: 0.5, width: '85vw', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});
      this.tl.set(this.menuOverlayRef, {pointerEvents: "auto"});
      this.tl.to(this.rt2Ref, {duration: 0.5, opacity: '0', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
      this.tl.to(this.rt1Ref, {duration: 0.5, y: 8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
      this.tl.to(this.rt3Ref, {duration: 0.5, y: -8, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
      this.tl.to(this.rt1Ref, {duration: 0.25, rotate: -45, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});
      this.tl.to(this.rt3Ref, {duration: 0.25, rotate: 45, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");

      this.tl.to(this.menuLabelRef, {duration: 0.5, text: {value: "CLOSE", delimiter: " "}, ease: "none"}, "-=0.5");
      this.tl.to(this.menuContentRef, {duration: 0.5, display: "flex", opacity: 1, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");


      this.tl.to(this.menuRef, {duration: 0.5, boxShadow: '-10px 0px 20px rgba(0,0,0,0.5)', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"} , "-=0.35");
      this.tl.to(this.menuOverlayRef, {duration: 0.5, opacity: '0.7', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
    }
    else {
      this.tl.to(this.menuContentRef, {duration: 0.5, display: "none", opacity: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});

      this.tl.to(this.menuRef, {duration: 0, boxShadow: '-10px 0px 20px rgba(0,0,0,0.0)', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
      this.tl.to(this.menuRef, {duration: 0.5, width: '70px', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
      this.tl.set(this.menuOverlayRef, {pointerEvents: "none"});
      this.tl.to(this.menuOverlayRef, {duration: 0.5, opacity: '0', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");

      this.tl.to(this.rt1Ref, {duration: 0.25, rotate: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});
      this.tl.to(this.rt3Ref, {duration: 0.25, rotate: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
      this.tl.to(this.rt1Ref, {duration: 0.5, y: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});
      this.tl.to(this.rt3Ref, {duration: 0.5, y: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
      this.tl.to(this.rt2Ref, {duration: 0.5, opacity: '1', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
      this.tl.to(this.menuLabelRef, {duration: 0.5, text: {value: "MENU", delimiter: " "}, ease: "none"}, "-=1");

      // this.tl.reverse();
    }

    this.setState({ isMenuExpanded: !this.state.isMenuExpanded });
  }


  renderMenuContent() {
    return (
      <div
        className={this.state.isMenuExpanded ? "menu-content-container" : "menu-content-container hidden"}
        ref={div => this.menuContentRef = div}
      >
        <a className="title" href="/">WORK</a>
        <a href="/work/apark" onClick={this.toggleMenu}>αPARK</a>
        <a href="/work/focused" onClick={this.toggleMenu}>FOCUSED.</a>
        <a href="/work/jazzin" onClick={this.toggleMenu}>JAZZIN</a>
        <a href="https://uxdesign.cc/the-gradual-disappearance-of-tactile-interaction-in-the-driving-experience-fe894f83188a" target="_blank">
          UX COLLECTIVE
        </a>
        <a href="/work/yintechlabs" onClick={this.toggleMenu}>YINTECH LABS</a>
        <a href="/work/faces" onClick={this.toggleMenu}>FACES OF THE PORTRAITS</a>

        <a className="title" href="/about">ABOUT</a>
      </div>
    );
  }

  render() {
    return (
      <div className="menu-overlay-container">
        <div
          className="menu-overlay"
          ref={div => this.menuOverlayRef = div}
          onClick={this.state.isMenuExpanded ? this.toggleMenu: () => {}}>
        </div>
        <div
          // className="menu-container"
          className={
            this.state.path.match(/.*work.+/)
            ?
              !this.state.isMenuExpanded ? "menu-container menu-compact" : "menu-container menu-compact compact-expand"
            :
              "menu-container"
          }
          ref={div => this.menuRef = div}
        >
          <div className="menu-button-wrapper">
            <div className="menu-bt" onClick={this.toggleMenu}>
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
