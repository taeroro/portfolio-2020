import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './work.css';

import gsap from 'gsap';
import TextPlugin from "gsap/TextPlugin";

const mockup_img_path = [
  './work/apark/small_apark_rendered-01.jpg',
  './work/focused/focused_mockup.jpg',
  './work/jazzin/jazzin.svg',
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
      nameMouseIsOver: false,
      titleDescY: 0,
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
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });

    console.log("hi");
  }

  componentWillUnmount() {
    console.log("bye");
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
          this.tl.to(this.introNameRef, {duration: 0.25, text: "αPARK", cursor: "default"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 1:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "FOCUSED.", cursor: "default"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 2:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "JAZZIN", cursor: "default"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "BRAND DESIGN & DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 3:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "THE ANVIL", cursor: "default"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 4:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "YINTECH LABS", cursor: "default"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "SOFTWARE DEVELOPMENT & DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 5:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "FACES OF THE PORTRAITS", cursor: "default"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DESIGN AND TECHNOLOGY"}, "-=0.25");
          break;
        case 6:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "UX COLLECTIVE", cursor: "default"});
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
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });
  }

  updateScroll() {
    let thumbnailHeight = this.thumbnailRef[0].clientHeight;
    // let thumbnailBottom = window.getComputedStyle(this.thumbnailRef[0]).getPropertyValue('margin-bottom');
    let offset1 = thumbnailHeight - (window.innerHeight - this.placeholderRef.clientHeight);

    if (window.pageYOffset < offset1) {
      this.setState({ currentThumbNum: -1 });
    }
    else if (window.pageYOffset >= offset1 && window.pageYOffset < this.thumbnailRef[0].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 0 });
      this.setState({nameMouseIsOver: false});
    }
    else if (window.pageYOffset >= this.thumbnailRef[0].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[1].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 1 });
      this.setState({nameMouseIsOver: false});
    }
    else if (window.pageYOffset >= this.thumbnailRef[1].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[2].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 2 });
      this.setState({nameMouseIsOver: false});
    }
    else if (window.pageYOffset >= this.thumbnailRef[2].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[3].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 3 });
      this.setState({nameMouseIsOver: false});
    }
    else if (window.pageYOffset >= this.thumbnailRef[3].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[4].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 4 });
      this.setState({nameMouseIsOver: false});
    }
    else if (window.pageYOffset >= this.thumbnailRef[4].offsetTop + (thumbnailHeight/2) && window.pageYOffset < this.thumbnailRef[5].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 5 });
      this.setState({nameMouseIsOver: false});
    }
    else if (window.pageYOffset >= this.thumbnailRef[5].offsetTop + (thumbnailHeight/2)) {
      this.setState({ currentThumbNum: 6 });
      this.setState({nameMouseIsOver: false});
    }
  }

  imgHoverOverHandler(index) {
    this.setState({mouseIsOver: index});
  }

  imgHoverLeaveHandler(index) {
    this.setState({mouseIsOver: -1});
  }

  imgOnClick(index) {
    if (index !== 6) {
      this.setState(
        {mouseIsOver: -1},
        () => {
          setTimeout(() => {
            let x = this.thumbnailRef[index].getBoundingClientRect().left;
            let y = this.thumbnailRef[index].getBoundingClientRect().top;
            let h = this.thumbnailRef[index].clientHeight;
            let w = this.thumbnailRef[index].clientWidth;

            console.log(x + ', ' + y + ' || ' + h + ', ' + w);

            this.props.history.push({
              pathname: '/work/' + index,
              state: {
                thumbnailPosX: x,
                thumbnailPosY: y,
                thumbnailHeight: h,
                thumbnailWidth: w
              }
            });
          }, 500);
        }
      );
    }
    else {
      this.setState(
        {mouseIsOver: -1},
        () => {
          setTimeout(() => {
            window.open("https://uxdesign.cc/the-gradual-disappearance-of-tactile-interaction-in-the-driving-experience-fe894f83188a", '_blank');
          }, 500);
        }
      )
    }
  }

  nameHoverOverHandler() {
    if (this.state.currentThumbNum === -1) {
      this.setState({nameMouseIsOver: true});
    }
  }

  nameHoverLeaveHandler() {
    if (this.state.currentThumbNum === -1) {
      this.setState({nameMouseIsOver: false});
    }
  }

  renderIntroduction() {
    return (
      <div className="introduction-container" ref={div => this.introRef = div}>
        <div>
          <span
            className="title-description"
            style={{marginTop: this.state.titleDescY}}
            ref={span => this.descriptionRef = span}
          >
          </span>
           <Link
             className="name-link"
             style={this.state.currentThumbNum === -1 ? {pointerEvents: "auto"} : {pointerEvents: "none"}}
             to={{
               pathname: "/about",
               state: {
                 isFromLink: true
               }
             }}
            >
             <h1
               // className="name"
               className={this.state.nameMouseIsOver ? "name name-mouse-over" : "name"}
               ref={h1 => this.introNameRef = h1}
               onMouseOver={() => this.nameHoverOverHandler()}
               onMouseLeave={() => this.nameHoverLeaveHandler()}
             >
               RYAN FAN
             </h1>
           </Link>

        </div>

        <div
          // className="skill-wrapper"
          className={this.state.nameMouseIsOver ? "skill-wrapper name-mouse-over" : "skill-wrapper"}
          ref={div => this.skillRef = div}
        >
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
        className={
          this.state.mouseIsOver === index
          ? "thumbnail-container mouse-over"
          : "thumbnail-container"
        }
        style={{marginBottom: bottom}}
        ref={div => this.thumbnailRef[index] = div}
        onMouseOver={() => this.imgHoverOverHandler(index)}
        onMouseLeave={() => this.imgHoverLeaveHandler(index)}
        onClick={() => this.imgOnClick(index)}
      >
        <img
          className={this.state.mouseIsOver === index ? imgClass + "mouse-over" : imgClass}
          src={mockup_img_path[index]}
          alt="thumbnail"
          ref={img => this.imgRef[index] = img}
        />

        <div
          className={
            this.state.mouseIsOver === index
            ? "open-bar-container mouse-over"
            : "open-bar-container"
          }
        >
          <span>&#8593; OPEN</span>
        </div>
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
