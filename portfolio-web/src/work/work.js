import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './work.css';

import gsap from 'gsap';
import TextPlugin from "gsap/TextPlugin";

const focused_mockup_path = './work/focused/focused-mockup.jpg';

class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {
      introHeight: 0,
      currentThumbNum: -1,
    };

    this.tl = gsap.timeline();
    gsap.registerPlugin(TextPlugin);

    this.introRef = null;
    this.introNameRef = null;
    this.thumbnailRef = null;
    this.skillRef = null;

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.updateScroll);

    this.setState({ introHeight: this.introRef.clientHeight + 105, currentThumbNum: 0 });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.updateScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentThumbNum !== this.state.currentThumbNum) {
      switch (this.state.currentThumbNum) {
        case 0:
          this.tl.to(this.introNameRef, {duration: 0.5, text: "RYAN FAN"});
          this.tl.to(this.skillRef, {duration: 0.5, opacity: '1', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
          break;
        case 1:
          this.tl.to(this.introNameRef, {duration: 0.5, text: "FOCUSED."});
          this.tl.to(this.skillRef, {duration: 0.5, opacity: '0', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.5");
          break;
        case 2:
          this.tl.to(this.introNameRef, {duration: 0.5, text: "αPARK"});
          break;
        default:
          this.tl.to(this.introNameRef, {duration: 0.5, text: "RYAN FAN"});
      }
    }
  }

  updateWindowDimensions() {
    this.setState({ introHeight: this.introRef.clientHeight + 105 });
  }

  updateScroll() {
    let offset1 = window.innerHeight - this.state.introHeight;

    if (window.pageYOffset < offset1) {
      this.setState({ currentThumbNum: 0 });
    }
    else if (window.pageYOffset >= offset1) {
      this.setState({ currentThumbNum: 1 });

      console.log(window.pageYOffset + ', ' + offset1);
    }
    // else if (window.pageYOffset >= (offset1 )) {
    //   this.setState({ currentThumbNum: 2 });
    // }

    // if (window.pageYOffset > this.state.introHeight) {
    //     if (offset2 - offset1 >= 0) {
    //       this.tl.to(this.introNameRef, {duration: 0.5, text: "NEW TITLE"});
    //     }
    // }

  }

  renderIntroduction() {
    return (
      <div className="introduction-container" ref={div => this.introRef = div}>
        <h1 className="name" ref={h1 => this.introNameRef = h1}>RYAN FAN</h1>
        <div className="skill-wrapper" ref={div => this.skillRef = div}>
          <div>
            <h2>DESIGN DIGITAL PRODUCTS</h2>
            <h2>DEVELOP SOFTWARE</h2>
            <h2>WRTIE BLOGS</h2>
          </div>
        </div>
      </div>
    );
  }

  renderThumbnail() {
    return (
      <div className="thumbnail-container" ref={div => this.thumbnailRef = div}>
        <img src={focused_mockup_path} alt="thumbnail image" />
      </div>
    );
  }

  render() {
    return (
      <div className="main-container">
        {this.renderIntroduction()}

        <div className="thumbnail-feed">
          <div className="feed-placeholder" style={{width: "100%", height: this.state.introHeight}}></div>
          {this.renderThumbnail()}
          {this.renderThumbnail()}
        </div>
      </div>
    );
  }
}

export default withRouter(Work);
