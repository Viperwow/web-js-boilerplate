/* eslint-disable react/no-this-in-sfc */

import React, {
  Component,
  Suspense,
} from 'react';
import {
  constant as _constant,
  isFinite as _isFinite,
} from 'lodash';

const DEFAULT_DELAY = 200;
const DEFAULT_TIMEOUT = 10000;

const loadable = ({
  importer,
  delay = DEFAULT_DELAY,
  timeout = DEFAULT_TIMEOUT,
  LoaderComponent = _constant('Loading...'),
  ErrorComponent = _constant('Error!'),
  TimeoutComponent = _constant('Timeout!'),
}) => props => {
  class Loadable extends Component {
    state = {
      error: null,
      isTimedOut: false,
      isDelay: true,
      LoadedComponent: _constant(null),
    };

    _isMounted = false;

    _delayJob = () => {
      if (_isFinite(delay) && delay >= 0) {
        return setTimeout(() => {
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

    _timeoutJob = () => {
      if (_isFinite(timeout) && timeout >= 0) {
        return setTimeout(() => {
          if (this._isMounted) {
            this.setState({
              isTimedOut: true,
            });
          }
        }, timeout);
      }

      return null;
    };

    componentDidMount() {
      this._isMounted = true;
      const delayHandler = this._delayJob();
      const timeoutHandler = this._timeoutJob();
      const LoadedComponent = React.lazy(async () => {
        const loadedModule = await importer();

        clearTimeout(delayHandler);
        clearTimeout(timeoutHandler);

        return loadedModule;
      });

      this.setState({
        LoadedComponent,
      });
    }

    componentDidCatch(error) {
      if (this._isMounted) {
        this.setState({
          error,
        });
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const {
        error,
        isTimedOut,
        isDelay,
        LoadedComponent,
      } = this.state;

      if (isTimedOut) {
        return <TimeoutComponent {...this.props} />;
      }

      if (error) {
        return <ErrorComponent {...{...this.props, error}} />;
      }

      const fallbackComponent = isDelay
        ? null
        : <LoaderComponent {...this.props} />;

      return (
        <Suspense fallback={fallbackComponent}>
          <LoadedComponent {...this.props} />
        </Suspense>
      );
    }
  }

  return <Loadable {...props} />;
};

export default loadable;
