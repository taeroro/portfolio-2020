import React, { Component } from 'react';
import './work-detail.css';

import gsap from 'gsap';
import TextPlugin from "gsap/TextPlugin";

import workData from './../work-detail-data';

export default class WorkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      dataObj: null,
      titleDescY: 0,
      titleDescHeight: 0,
    };

    this.tl = gsap.timeline();
    gsap.registerPlugin(TextPlugin);

    this.introNameRef = null;
    this.descriptionRef = null;

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);

    const index = this.props.match.params.id;

    this.setState({
      dataObj: workData[index],
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });

    setTimeout(() => {
      this.setState({
        titleDescHeight: this.descriptionRef.clientHeight
      })

      console.log(this.descriptionRef.clientHeight);
    }, 1);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });
  }


  renderFixedContent() {
    const title = this.state.dataObj && this.state.dataObj.title;
    const category = this.state.dataObj && this.state.dataObj.category;

    let calcTop = parseInt(this.state.titleDescY, 10) - (this.state.titleDescHeight*0.9);
    console.log(calcTop);

    return (
      <div className="introduction-container detail-page">
        <span
          className="title-description"
          style={{marginTop: calcTop}}
          ref={span => this.descriptionRef = span}
        >
          {category}
        </span>
         <h1
           className="name"
           ref={h1 => this.introNameRef = h1}
         >
           {title}
         </h1>
      </div>
    );
  }

  renderContent0() {
    const imgPath = this.state.dataObj && this.state.dataObj.thumbnail_image_path;

    if (this.state.dataObj)
      console.log(this.state.dataObj.thumbnail_image_path);

    return (
      <div className="content-0">
        <div className="img-wrapper">
          <img
            className="thumbnail-img"
            src={imgPath}
            alt="thumbnail"
          />
        </div>
      </div>
    );
  }

  renderContent1() {
    return (
      <div className="content-1">
        BLAHBLAH
      </div>
    );
  }

  render() {
    return (
      <div className="work-detail-container">
        {this.renderFixedContent()}
        {this.renderContent0()}
        {this.renderContent1()}
      </div>
    );
  }
}
