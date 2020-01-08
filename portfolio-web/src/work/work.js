import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './work.css';

import gsap from 'gsap';
import TextPlugin from "gsap/TextPlugin";

const mockup_img_path = [
  './work/apark/small_apark_rendered-01.jpg',
  './work/focused/focused_mockup.jpg',
  './work/jazzin/jazzin.png',
  './work/driving/uxdesign.cc_the-gradual-disappearance-of-tactile-interaction-in-the-driving-experience-fe894f83188a.jpg',
  './work/yintech/Yintechlabs-01.jpg',
  './work/faces/faces.webm',
]
const indexToPath = [
  "apark",
  "focused",
  "jazzin",
  "uxcollective",
  "yintechlabs",
  "faces",
];

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

    this.pageTransitionTl = gsap.timeline();

    this.introRef = null;
    this.introNameRef = null;
    this.thumbnailRef = [];
    this.skillRef = null;
    this.placeholderRef = null;
    this.descriptionRef = null;
    this.imgRef = [];
    this.hugePageTransitionRef = null;

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.updateScroll);

    let newY = window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top');
    if (window.innerWidth <= 768)
      newY = parseFloat(newY) - 10 + "px";

    this.setState({
      introHeight: this.introRef.clientHeight + 105,
      currentThumbNum: -1,
      titleDescY: newY,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.updateScroll);

    this.tl.kill();
    this.pageTransitionTl.kill();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentThumbNum !== this.state.currentThumbNum) {
      switch (this.state.currentThumbNum) {
        case -1:
          // this.tl.progress(1).clear();
          this.tl.to(this.introNameRef, {duration: 0.25, text: "RYAN FAN"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '1', display: 'flex', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: ""}, "-=0.25");
          break;
        case 0:
          this.tl.progress(1).clear();
          this.tl.to(this.introNameRef, {duration: 0.25, text: "αPARK", cursor: "default"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 1:
          this.tl.progress(1).clear();
          this.tl.set(this.skillRef, {opacity: '0', display: 'none'});

          this.tl.to(this.introNameRef, {duration: 0.25, text: "FOCUSED.", cursor: "default"});
          // this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 2:
          this.tl.progress(1).clear();
          this.tl.set(this.skillRef, {opacity: '0', display: 'none'});

          this.tl.to(this.introNameRef, {duration: 0.25, text: "JAZZIN", cursor: "default"});
          // this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "BRAND DESIGN & DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 3:
          this.tl.progress(1).clear();
          this.tl.set(this.skillRef, {opacity: '0', display: 'none'});

          this.tl.to(this.introNameRef, {duration: 0.25, text: "UX COLLECTIVE", cursor: "default"});
          // this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "PUBLICATION"}, "-=0.25");
          break;
        case 4:
          this.tl.progress(1).clear();
          this.tl.set(this.skillRef, {opacity: '0', display: 'none'});

          this.tl.to(this.introNameRef, {duration: 0.25, text: "YINTECH LABS", cursor: "default"});
          // this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "SOFTWARE DEVELOPMENT & DIGITAL PRODUCT DESIGN"}, "-=0.25");
          break;
        case 5:
          this.tl.progress(1).clear();
          this.tl.set(this.skillRef, {opacity: '0', display: 'none'});

          this.tl.to(this.introNameRef, {duration: 0.5, text: "FACES OF THE PORTRAITS", cursor: "default"});
          // this.tl.to(this.skillRef, {duration: 0.25, opacity: '0', display: 'none', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: "DESIGN AND TECHNOLOGY"}, "-=0.5");
          break;
        default:
          this.tl.to(this.introNameRef, {duration: 0.25, text: "RYAN FAN"});
          this.tl.to(this.skillRef, {duration: 0.25, opacity: '1', display: 'flex', ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
          this.tl.to(this.descriptionRef, {duration: 0.25, text: ""}, "-=0.25");
      }
    }
  }

  updateWindowDimensions() {
    let newY = window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top');
    if (window.innerWidth <= 768)
      newY = parseFloat(newY) - 10 + "px";

    this.setState({
      introHeight: this.introRef.clientHeight + 105,
      titleDescY: newY,
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
  }

  imgHoverOverHandler(index) {
    this.setState({mouseIsOver: index});
  }

  imgHoverLeaveHandler(index) {
    this.setState({mouseIsOver: -1});
  }

  imgOnClick(index) {
    if (index !== 3) {
      this.pageTransitionTl.to(this.hugePageTransitionRef, {duration: 0.5, opacity: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});

      this.setState(
        {mouseIsOver: -1},
        () => {
          setTimeout(() => {
            let windowY = window.pageYOffset;

            this.props.history.push({
              pathname: '/work/' + indexToPath[index],
              state: {
                windowY: windowY
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
            window.open("https://uxdesign.cc/the-gradual-disappearance-of-tactile-interaction-in-the-driving-experience-fe894f83188a", '_blank', 'noopener noreferrer');
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
            <h2>DESIGNS DIGITAL PRODUCTS</h2>
            <h2>DEVELOPS SOFTWARE</h2>
            <h2>WRITES BLOGS</h2>
          </div>
        </div>
      </div>
    );
  }

  renderThumbnail(index) {
    const imgClass = "thumbnail-img-" + index;
    let bottom = ((window.innerHeight - this.state.introHeight)/2 > 100) ? (window.innerHeight - this.state.introHeight)/2 : 100;

    let containerClass = mockup_img_path[index].includes("webm") ? "thumbnail-container video" : "thumbnail-container";

    return (
      <div
        className={
          this.state.mouseIsOver === index
          ? containerClass + " mouse-over"
          : containerClass
        }
        style={{marginBottom: bottom}}
        ref={div => this.thumbnailRef[index] = div}
        onMouseOver={() => this.imgHoverOverHandler(index)}
        onMouseLeave={() => this.imgHoverLeaveHandler(index)}
        onClick={() => this.imgOnClick(index)}
      >
        {
          mockup_img_path[index].includes("webm")
          ? (
            <video
              playsInline loop muted autoPlay
              preload="none"
              className={this.state.mouseIsOver === index ? "thumbnail-vid mouse-over" : "thumbnail-vid"}
              ref={video => this.imgRef[index] = video}
            >
              <source src={mockup_img_path[index]} type="video/webm" />
              <source src={mockup_img_path[index].replace("webm", "mp4")} type="video/mp4" />
            </video>
          )
          : (
            <img
              className={this.state.mouseIsOver === index ? imgClass + " mouse-over" : imgClass}
              src={mockup_img_path[index]}
              alt="thumbnail"
              ref={img => this.imgRef[index] = img}
            />
          )
        }

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
      <div className="main-container" ref={div => this.hugePageTransitionRef = div}>
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
        </div>
      </div>
    );
  }
}

export default withRouter(Work);
