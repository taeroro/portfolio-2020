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
    this.contactRef = null;
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.isFromLink) {
      setTimeout(() => {
        this.setState({ nameMouseIsOver: false });
        this.tl.to(this.bioRef, {duration: 0.5, opacity: 1, y: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "+=0.25");
        this.tl.to(this.contactRef, {duration: 0.5, opacity: 1, y: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
      }, 250);
    }
    else {
      this.setState({ nameMouseIsOver: false });
      this.tl.to(this.bioRef, {duration: 0.5, opacity: 1, y: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "+=0.25");
      this.tl.to(this.contactRef, {duration: 0.5, opacity: 1, y: 0, ease: "cubic-bezier(0.215, 0.61, 0.355, 1)"}, "-=0.25");
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
          is a <i><b>digital product designer</b></i> and <i><b>front-end engineer</b></i> with a concentration in the practice of user experience design based in NYC. He holds a Bachelor of Science degree in Computer Science from Purdue University and is obtaining a Master's degree in Communication Design at Parsons School of Design.
          <br /><br />
          Ryan’s background and experience allow him to easily translate between design and engineering teams to build cohesive, thoughtful digital products.
          <br /><br />
          Before attending graduate school, he worked at a machine learning and big data lab under an investment company as a UX Engineer, where he led the design and developed projects from start to end; he also led the design of the new landing website as a freelance UI/UX designer for an organization of aspiring entrepreneurs.
          <br /><br />
          After several years practicing as a software engineer, Ryan made the switch to product design in an effort to help humans understand machines better.
          <br /><br />
          More recently, he has been working as a contract front-end UI developer in NYC. He is collaborative by nature, looking to sharpen his skills and gain experience as a creative practitioner, bridging the gap between engineers and designers to make teams more efficient and cohesive.
          <br /><br />
          <hr />
          <span>when he's not working, he is a serial driver, road trip enthusiast and frequent flyer. he enjoys outdoor activities like snowboarding; cooking while watching bon Appétit test kitchen videos, and a boston terrier lover!</span>
        </p>

        <div className="contact-wrapper" ref={div => this.contactRef = div}>
          <h2 className="contact">CONTACT</h2>
          <div className="another-contact-wrapper">
            <p>Email: <a href="mailto:hello@ryanfandesign.com">hello@ryanfandesign.com</a></p>
            <div>
              <a href="https://www.linkedin.com/in/zuyuanfan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/ryantf11/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://github.com/taeroro" target="_blank" rel="noopener noreferrer">Github</a>
              <a href="https://drive.google.com/file/d/1hQGhCN-FATjePo5-kOivhYxNmeKNbVWX/view?usp=sharing" target="_blank" rel="noopener noreferrer">Résumé</a>
            </div>
          </div>
        </div>

        {/* <p className="copyright">© 2020 ZUYUAN FAN. ALL RIGHTS RESERVED.</p> */}
      </div>
    );
  }
}
