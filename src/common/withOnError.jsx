/* eslint-disable react/no-this-in-sfc */

import React, {Component} from 'react';
import {isFunction as _isFunction} from 'lodash';

const withOnError = Wrapped => props => {
  class WithOnErrorComponent extends Component {
    componentDidCatch(error, info) {
      const {onError} = this.props;

      if (_isFunction(onError)) {
        onError(error, info);
      } else {
        throw error;
      }
    }

    render() {
      const {onError, ...restProps} = this.props;

      return <Wrapped {...restProps} />;
    }
  }

  return <WithOnErrorComponent {...props} />;
};

export default withOnError;
