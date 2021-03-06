// Vendors
import React, {
  Component,
  Fragment,
  Suspense,
} from 'react';
import {constant as _constant} from 'lodash';

const _defaultOptions = {
  delay: 300,
  timeout: 10000,
};
const _LoaderComponent = () => <Fragment>Loading...</Fragment>;
const _ErrorComponent = () => <Fragment>Error!</Fragment>;
const _TimeoutComponent = () => <Fragment>Timeout!</Fragment>;

export default (
  importer,
  options = {},
  LoaderComponent = _LoaderComponent,
  ErrorComponent = _ErrorComponent,
  TimeoutComponent = _TimeoutComponent,
) => class Loadable extends Component {
  state = {
    isMounted: false,
    error: null,
    isTimedOut: false,
    isDelayEnded: false,
    LoadedComponent: _constant(null),
  };

  _delayJob = () => {
    const delayHandler = setTimeout(() => {
      const {
        isMounted,
      } = this.state;

      if (isMounted) {
        this.setState(state => ({
          ...state,
          isDelayEnded: true,
        }));
      }

      clearTimeout(delayHandler);
    }, this._options.delay);

    return delayHandler;
  };

  _timeoutJob = () => {
    const timeoutHandler = setTimeout(() => {
      const {
        isMounted,
      } = this.state;

      if (isMounted) {
        this.setState(state => ({
          ...state,
          isTimedOut: true,
        }));
      }

      clearTimeout(timeoutHandler);
    }, this._options.timeout);

    return timeoutHandler;
  };

  constructor(...args) {
    super(...args);

    this._options = {
      ..._defaultOptions,
      ...options,
    };
  }

  componentDidMount() {
    this._delayJob();
    const timeoutHandler = this._timeoutJob();

    this.setState(state => ({
      ...state,
      isMounted: true,
      LoadedComponent: React.lazy(async () => {
        const loadedModule = await importer;

        clearTimeout(timeoutHandler);

        return loadedModule;
      }),
    }));
  }

  componentDidCatch(error) {
    const {
      isMounted,
    } = this.state;

    if (isMounted) {
      this.setState(state => ({
        ...state,
        error,
      }));
    }
  }

  componentWillUnmount() {
    this.setState(state => ({
      ...state,
      isMounted: false,
    }));
  }

  render() {
    let result = null;
    const {
      error,
      isTimedOut,
      isDelayEnded,
      LoadedComponent,
    } = this.state;

    if (isTimedOut) {
      result = <TimeoutComponent {...this.props} />;
    } else if (error) {
      result = <ErrorComponent {...{...this.props, error}} />;
    } else {
      const fallbackComponent = isDelayEnded
        ? <LoaderComponent {...this.props} />
        : null;

      result = (
        <Suspense fallback={fallbackComponent}>
          <LoadedComponent {...this.props} />
        </Suspense>
      );
    }

    return result;
  }
};
