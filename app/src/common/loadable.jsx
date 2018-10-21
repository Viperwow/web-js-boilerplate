// Vendors
import React, {Fragment} from 'react';
import loadable from 'react-loadable';
import {noop} from 'lodash';

const _defaultProps = {
  delay: 300,
  timeout: 10000,
};
const _LoaderComponent = () => <Fragment>Loading...</Fragment>;
const _ErrorComponent = () => <Fragment>Error!</Fragment>;
const _TimeoutComponent = () => <Fragment>Timeout!</Fragment>;
const _renderComponent = (
  LoaderComponent = noop,
  ErrorComponent = noop,
  TimeoutComponent = noop,
  props = {},
) => {
  let result = null;
  const {
    pastDelay,
    error,
    timedOut,
    ...restProps
  } = props;

  if (pastDelay) {
    result = <LoaderComponent {...{...restProps}} />;
  } else if (error) {
    result = <ErrorComponent {...{...restProps, error}} />;
  } else if (timedOut) {
    result = <TimeoutComponent {...{...restProps}} />;
  }

  return result;
};

export default (importer, options = _defaultProps) => (
  LoaderComponent = _LoaderComponent,
  ErrorComponent = _ErrorComponent,
  TimeoutComponent = _TimeoutComponent,
) => loadable({
  ...options,
  loader: () => (importer || null),
  loading: (props = {}) => _renderComponent(
    LoaderComponent,
    ErrorComponent,
    TimeoutComponent,
    props,
  ),
});
