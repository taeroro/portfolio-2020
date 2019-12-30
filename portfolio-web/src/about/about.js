import React, { Component } from 'react';
import './about.css';

import gsap from 'gsap';
import TextPlugin from "gsap/TextPlugin";

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      nameMouseIsOver: true,
    };

    this.tl = gsap.timeline();
    gsap.registerPlugin(TextPlugin);

    this.introNameRef = null;
    this.bioRef = null;
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.isFromLink) {
      setTimeout(() => {
        this.setState({ nameMouseIsOver: false });
        this.tl.to(this.bioRef, {duration: 0.5, opacity: 1, y: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "+=0.25");
      }, 250);
    }
    else {
      this.setState({ nameMouseIsOver: false });
    }

    // this.tl.to(this.bioRef, {duration: 0.5, opacity: 1, y: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"});
  }


  render() {
    return (
      <div className="about-container">
        <div className="name-container">
          <h1
            className={this.state.nameMouseIsOver ? "name name-mouse-over" : "name"}
            ref={h1 => this.introNameRef = h1}
            // onMouseOver={() => {this.setState({nameMouseIsOver: true})}}
            // onMouseLeave={() => {this.setState({nameMouseIsOver: false})}}
          >
            RYAN FAN
          </h1>
        </div>

        <p className="bio" ref={p => this.bioRef = p}>
          is a digital product designer and engineer with a concentration in the practice of user experience design. He holds a Bachelor of Science degree in Computer Science from Purdue University(2019), and attaining a Masters of Professional Studies degree in Communication Design at Parsons School of Design(2020).
          <br /><br />
          With the rapidly growing demand in digital product design, he stands at the intersection of design and engineering, positioning himself as the liaison of cooperating these interdisciplinary fields together to facilitate and create thoughtful user experience of the digital products.
        </p>
      </div>
    );
  }
}
