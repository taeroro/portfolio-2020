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
    window.addEventListener('scroll', this.updateScroll);

    if (this.props.location.state) {
      console.log(this.props.location.state);
      // TODO: animation
    }

    const index = this.props.match.params.id;

    this.setState({
      dataObj: workData[index],
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });

    setTimeout(() => {
      this.setState({
        titleDescHeight: this.descriptionRef.clientHeight
      })
    }, 1);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.updateScroll);
  }

  updateWindowDimensions() {
    this.setState({
      titleDescY: window.getComputedStyle(this.introNameRef).getPropertyValue('margin-top'),
    });
  }

  updateScroll() {

  }

  renderFixedContent() {
    const title = this.state.dataObj && this.state.dataObj.title;
    const category = this.state.dataObj && this.state.dataObj.category;

    let calcTop = parseInt(this.state.titleDescY, 10) - (this.state.titleDescHeight*0.9);

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

  renderThumbnail() {
    const imgPath = this.state.dataObj && this.state.dataObj.thumbnail_image_path;

    // if (this.state.dataObj)
    //   console.log(this.state.dataObj.thumbnail_image_path);

    return (
      <div className="thumbnail-wrapper">
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

  renderContent(content) {
    return (
      <div className={"content-" + content.content_id} key={content.content_id}>
        <h2>{content.content_title}</h2>
        <p>{content.content_data}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="work-detail-container">
        {this.renderFixedContent()}
        {this.renderThumbnail()}
        {
          this.state.dataObj && this.state.dataObj.content &&
          this.state.dataObj.content.map((item, index) => {
            return this.renderContent(item);
          })
        }
      </div>
    );
  }
}
