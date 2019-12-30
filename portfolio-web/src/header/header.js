import React, { Component } from 'react';
import './header.css';
import { Link, withRouter } from "react-router-dom";

const logo_path = './logo-new.svg';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "/",
    };
  }

  componentWillMount() {
    this.setState({ path: this.props.location.pathname });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.location.pathname });
    console.log(nextProps.location.pathname);
  }

  render() {
    return (
      <nav className="header-container">
        <div className="header-desktop">
          <div className="logo-wrapper">
            <a href="/">
              <img src={logo_path} alt="logo" />
            </a>
          </div>

          <div className={this.state.path === "/" ? "back-button hide-button" : "back-button"}>
            <Link
              className="back-link"
              to={{pathname: "/"}}
             >
              &#8598; BACK
            </Link>
          </div>

        </div>
      </nav>
    );
  }
}
