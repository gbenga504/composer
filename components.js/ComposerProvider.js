import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

export default class ComposerProvider extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    children: PropTypes.any,
    store: PropTypes.any,
    client: PropTypes.any
  };

  static childContextTypes = {
    store: PropTypes.any,
    client: PropTypes.any
  };

  getChildContext() {
    return {
      store: this.props.store,
      client: this.props.client
    };
  }

  render() {
    let { store, children } = this.props;
    return <Provider store={store}>{children}</Provider>;
  }
}
