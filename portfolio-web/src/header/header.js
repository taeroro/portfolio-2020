import React, { Component } from 'react';
import './header.css';
import { Link } from "react-router-dom";
// import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

const logo_path = '/logo-new.svg';

// const history = createBrowserHistory();
ReactGA.initialize('UA-131928857-1');


export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "/",
    };
  }

  componentDidUpdate(prevProps) {
    ReactGA.pageview(this.props.location.pathname);
  }

  componentWillMount() {
    this.setState({ path: this.props.location.pathname });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.location.pathname });
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
              &#8598; HOME
            </Link>
          </div>

        </div>
      </nav>
    );
  }
}
