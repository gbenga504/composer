/**
 * @function is a [HOC] that takes the wrapped component along with its
 * config options to decorate a new component containing the new props
 */
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import hoistNonReactStatic from "hoist-non-react-statics";
import PropTypes from "prop-types";

import { Throwable } from "../utils/throwable";
import { Helpers } from "../utils/helpers";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

const composer = (method, { props, name, options, skip }) => {
  function decorateClass(WrappedComponent) {
    return connect(state => ({
      routeDatas: state.routeDatas,
      queryDatas: state.queryDatas
    }))(
      class Composer extends React.PureComponent {
        constructor(props, context) {
          super(props, context);
          Throwable.initThrowable(method, { name, options, props });
        }

        static contextTypes = {
          store: PropTypes.any,
          client: PropTypes.any
        };

        static displayName = `Composer(${getDisplayName(WrappedComponent)})`;

        render() {
          return <WrappedComponent {...this.props} />;
        }
      }
    );
  }
  return decorateClass;
};

export default composer;
