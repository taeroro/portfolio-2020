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
          is a <i><b>UI/UX designer & developer</b></i> currently based in NYC. Ryan’s background and experience allow him to easily translate between design and engineering teams to build cohesive, thoughtful digital products.
          <br /><br />
          Ryan is passionate about using digital product design to help humans understand machines better. He values collaboration and loves working in a cross-functional & multidisciplinary environment.
          <br /><br />
          He has been working with creative agencies and brands on things like responsive website, native mobile app, motion graphics, and accelerating product launches by providing consultation to the development teams.
          <br /><br />
          When he's not working, he is a serial driver, road trip enthusiast <s>and frequent flyer</s>. He enjoys outdoor activities like snowboarding, cooking & baking Joshua Weissman and Gordon Ramsay's recipes, and loves Boston Terrier!
        </p>

        <div className="contact-wrapper" ref={div => this.contactRef = div}>
          <h2 className="contact">CONTACT</h2>
          <div className="another-contact-wrapper">
            <p>Email: <a href="mailto:hello@ryanfandesign.com">hello@ryanfandesign.com</a></p>
            <div>
              <a href="https://www.linkedin.com/in/zuyuanfan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/ryantf11/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://uxdesign.cc/the-gradual-disappearance-of-tactile-interaction-in-the-driving-experience-fe894f83188a" target="_blank" rel="noopener noreferrer">Medium</a>
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
