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
    };

    this.tl = gsap.timeline();
    gsap.registerPlugin(TextPlugin);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    const index = this.props.match.params.id;

    this.setState({
      dataObj: workData[index]
    });

    console.log(workData[index]);
  }


  render() {
    return (
      <div className="work-detail-container">
        {this.props.match.params.id}
      </div>
    );
  }
}
