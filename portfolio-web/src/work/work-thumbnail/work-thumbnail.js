import React, { Component } from 'react';
import './work-thumbnail.css';

const focused_mockup_path = './work/focused/focused-mockup.jpg';

class Thumbnail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <div className="thumbnail-container">
        <img src={focused_mockup_path} alt="thumbnail image" />
      </div>
    );
  }
}

export default Thumbnail;
