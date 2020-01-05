import { PureComponent } from "react";
import { withRouter } from "react-router-dom";

class ScrollIntoView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { windowY: 0 };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  componentDidUpdate = prevProps => {
    if (prevProps.history.location.state && prevProps.history.location.state.windowY) {
      this.state.windowY = prevProps.history.location.state.windowY;
    }

    if (this.props.location.pathname === "/") {
      let y = this.state.windowY;
      this.state.windowY = 0;
      window.scrollTo(0, y);
    }

    if (this.props.location !== prevProps.location && this.props.location.pathname !== "/") {
      window.scrollTo(0, 0);
    }
  };

  render = () => this.props.children;
}

export default withRouter(ScrollIntoView);
