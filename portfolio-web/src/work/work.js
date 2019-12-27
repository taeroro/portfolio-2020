import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './work.css';

import Thumbnail from './work-thumbnail/work-thumbnail';

class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  renderIntroduction() {
    return (
      <div className="introduction-container">
        <h1 className="name">RYAN FAN</h1>
        <div className="skill-wrapper">
          <div>
            <h2>DESIGN DIGITAL PRODUCTS</h2>
            <h2>DEVELOP SOFTWARE</h2>
            <h2>WRTIE BLOGS</h2>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="main-container">
        {this.renderIntroduction()}
        <Thumbnail />
        <Thumbnail />
      </div>
    );
  }
}

export default withRouter(Work);
