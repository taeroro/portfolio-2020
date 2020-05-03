import React, { Component } from 'react';
import { withController } from 'react-scroll-parallax';

class Image extends Component {
  handleLoad = () => {
    // updates cached values after image dimensions have loaded
    this.props.parallaxController.update();
  };

  render() {
    const { parallaxController, ...rest } = this.props;
    return <img {...rest} onLoad={this.handleLoad} />;
  }
}

export default withController(Image);
