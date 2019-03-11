/* eslint-disable react/no-this-in-sfc */

import React, {
  Component,
  Suspense,
} from 'react';
import {
  constant as _constant,
  isFinite as _isFinite,
} from 'lodash';
import Loader from 'src/UI/components/Loader';

const DEFAULT_DELAY = 200;
const DEFAULT_TIMEOUT = 10000;

export default ({
  importer,
  delay = DEFAULT_DELAY,
  timeout = DEFAULT_TIMEOUT,
  LoaderComponent = Loader,
  ErrorComponent = _constant('Error!'),
  TimeoutComponent = _constant('Timeout!'),
}) => props => {
  class Loadable extends Component {
    state = {
      error: null,
      isTimedOut: false,
      isDelayEnded: false,
      LoadedComponent: _constant(null),
    };

    _isMounted = false;

    _delayJob = () => setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          isDelayEnded: true,
        });
      }
    }, delay);

    _timeoutJob = () => {
      if (_isFinite(timeout) && timeout >= 0) {
        setTimeout(() => {
          if (this._isMounted) {
            this.setState({
              isTimedOut: true,
            });
          }
        }, timeout);
      }
    };

    componentDidMount() {
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
        isDelayEnded,
        LoadedComponent,
      } = this.state;

      if (isTimedOut) {
        return <TimeoutComponent {...this.props} />;
      }

      if (error) {
        return <ErrorComponent {...{...this.props, error}} />;
      }

      const fallbackComponent = isDelayEnded
        ? <LoaderComponent {...this.props} />
        : null;

      return (
        <Suspense fallback={fallbackComponent}>
          <LoadedComponent {...this.props} />
        </Suspense>
      );
    }
  }

  return <Loadable {...props} />;
};
