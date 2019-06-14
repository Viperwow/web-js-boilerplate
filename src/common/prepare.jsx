/* eslint-disable react/no-this-in-sfc */

import React, {Component} from 'react';
import {
  constant as _constant,
  isFinite as _isFinite,
} from 'lodash';

const DEFAULT_DELAY = 200;

const prepare = ({
  preparation,
  delay = DEFAULT_DELAY,
  processorSuccess = result => ({result: result || null}),
  processorError = error => ({error: error || null}),
  LoaderComponent = _constant('Loading...'),
}) => Wrapped => props => {
  class Prepared extends Component {
    state = {
      result: null,
      error: null,
      isPreparing: true,
    };

    _isMounted = false;

    _processPreparation = async () => preparation(this.props); // Coercion to convert the result of the operation to the Promise

    _onProcessSuccess = result => {
      if (this._isMounted) {
        this.setState({
          isPreparing: false,
          result,
        });
      }
    };

    _onProcessError = error => {
      if (this._isMounted) {
        this.setState({
          isPreparing: false,
          error,
        });
      }
    };

    _delayJob = () => {
      if (_isFinite(delay) && delay >= 0) {
        setTimeout(() => {
          if (this._isMounted) {
            this.setState({
              isDelay: false,
            });
          }
        }, delay);
      }

      if (this._isMounted) {
        this.setState({
          isDelay: false,
        });
      }

      return null;
    };

    componentDidMount() {
      this._isMounted = true;
      const delayHandler = this._delayJob();

      this._processPreparation()
        .then(result => {
          clearTimeout(delayHandler);
          return this._onProcessSuccess(result);
        })
        .catch(error => {
          clearTimeout(delayHandler);
          this._onProcessError(error);
        });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const {
        result,
        error,
        isPreparing,
        isDelay,
      } = this.state;
      const CurrentLoader = isDelay
        ? _constant(null)
        : LoaderComponent;

      return isPreparing
        ? <CurrentLoader />
        : <Wrapped {...this.props} {...processorSuccess(result)} {...processorError(error)} />;
    }
  }

  return <Prepared {...props} />;
};

export default prepare;
