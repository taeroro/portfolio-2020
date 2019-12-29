import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './work.css';

import gsap from 'gsap';
import TextPlugin from "gsap/TextPlugin";

const mockup_img_path = [
  './work/focused/focused-mockup.jpg',
  './work/apark/small_apark_rendered-01.jpg',
  './work/apark/small_apark_rendered-01.jpg',
  './work/apark/small_apark_rendered-01.jpg',
  './work/apark/small_apark_rendered-01.jpg',
  './work/apark/small_apark_rendered-01.jpg',
  './work/driving/uxdesign.cc_the-gradual-disappearance-of-tactile-interaction-in-the-driving-experience-fe894f83188a.png',
]

class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {
      introHeight: 0,
      currentThumbNum: -1,
      mouseIsOver: -1,
    };

    this.tl = gsap.timeline();
    gsap.registerPlugin(TextPlugin);

    this.introRef = null;
    this.introNameRef = null;
    this.thumbnailRef = [];
    this.skillRef = null;
    this.placeholderRef = null;
    this.descriptionRef = null;
    this.imgRef = [];

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.updateScroll);

    this.setState({
      introHeight: this.introRef.clientHeight + 105,
      currentThumbNum: -1,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.updateScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentThumbNum !== this.state.currentThumbNum) {
      switch (this.state.currentThumbNum) {
        case -1:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "RYAN FAN"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '1', display: 'flex', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: ""}, "-=0.25");
          break;
        case 0:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "FOCUSED."});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 1:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "αPARK"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 2:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "JAZZIN"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "BRAND DESIGN & DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 3:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "THE ANVIL"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 4:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "YINTECH LABS"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "SOFTWARE DEVELOPMENT & DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 5:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "FACES OF THE PORTRAITS"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DESIGN AND TECHNOLOGY"}, "-=0.25");
          break;
        case 6:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "INTERACTION IN DRIVING"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "PUBLICATION"}, "-=0.25");
          break;
        default:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "RYAN FAN"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '1', display: 'flex', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: ""}, "-=0.25");
      }
    }
  }

  updateWindowDimensions() {
    this.setState({
      introHeight: this.introRef.clientHeight + 105,
      // thumbMarginBottom: window.getComputedStyle(this.thumbnailRef).getPropertyValue('margin-bottom')
    });
  }

  updateScroll() {
    let thumbnailHeight = this.thumbnailRef[0].clientHeight;
    let thumbnailBottom = window.getComputedStyle(this.thumbnailRef[0]).getPropertyValue('margin-bottom');
    let offset1 = thumbnailHeight - (window.innerHeight - this.placeholderRef.clientHeight);

    if (window.pageYOffset < offset1) {
      this.setState({ currentThumbNum: -1 });
    }
    else if (window.pageYOffset >= offset1 && window.pageYOffset < this.thumbnailRef[0].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 0 });
    }
    else if (window.pageYOffset >= this.thumbnailRef[0].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[1].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 1 });
    }
    else if (window.pageYOffset >= this.thumbnailRef[1].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[2].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 2 });
    }
    else if (window.pageYOffset >= this.thumbnailRef[2].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[3].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 3 });
    }
    else if (window.pageYOffset >= this.thumbnailRef[3].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[4].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 4 });
    }
    else if (window.pageYOffset >= this.thumbnailRef[4].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[5].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 5 });
    }
    else if (window.pageYOffset >= this.thumbnailRef[5].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 6 });
    }
  }

  imgHoverOverHandler(index) {
    this.setState({mouseIsOver: index});
  }

  imgHoverLeaveHandler(index) {
    this.setState({mouseIsOver: -1});
  }

  renderIntroduction() {
    return (
      <div className="introduction-container" ref={div => this.introRef = div}>
        <div>
          <span className="title-description" ref={span => this.descriptionRef = span}></span>
          <h1 className="name" ref={h1 => this.introNameRef = h1}>RYAN FAN</h1>
        </div>

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

  renderThumbnail(index) {
    const imgClass = "thumbnail-img-" + index + " ";
    let bottom = ((window.innerHeight - this.state.introHeight)/2 > 100) ? (window.innerHeight - this.state.introHeight)/2 : 100;

    return (
      <div
        className={this.state.currentThumbNum === index ? "thumbnail-container page-enter" : "thumbnail-container"}
        // className="thumbnail-container"
        style={{marginBottom: bottom}}
        ref={div => this.thumbnailRef[index] = div}
        onMouseOver={() => this.imgHoverOverHandler(index)}
        onMouseLeave={() => this.imgHoverLeaveHandler(index)}
      >
        <img
          className={this.state.mouseIsOver === index ? imgClass + "mouse-over" : imgClass}
          src={mockup_img_path[index]}
          alt="thumbnail image"
          ref={img => this.imgRef[index] = img}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="main-container">
        {this.renderIntroduction()}

        <div className="thumbnail-feed">
          <div
            className="feed-placeholder"
            style={{width: "100%", height: this.state.introHeight}}
            ref={div => this.placeholderRef = div}
          >
          </div>
          {this.renderThumbnail(0)}
          {this.renderThumbnail(1)}
          {this.renderThumbnail(2)}
          {this.renderThumbnail(3)}
          {this.renderThumbnail(4)}
          {this.renderThumbnail(5)}
          {this.renderThumbnail(6)}
        </div>
      </div>
    );
  }
}

export default withRouter(Work);
