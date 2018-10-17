import {noop} from 'lodash';
import React, {Fragment} from 'react';
import prepare from 'src/common/prepare';

const LOADING_MESSAGE = 'Is loading...';
const ERROR_MESSAGE = 'Error!';

class DynamicWrapped extends React.Component {
  render() {
    const {
      isPreparing,
      error,
      Loader,
      Component,
      ErrorComponent,
      ...restProps
    } = this.props;
    const LoadedComponent = error
      ? ErrorComponent
      : Component;

    return isPreparing
      ? <Loader />
      : <LoadedComponent {...{error, ...restProps}} />;
  }
}

DynamicWrapped.defaultProps = {
  Loader: () => <Fragment>{LOADING_MESSAGE}</Fragment>,
  ErrorComponent: () => <Fragment>{ERROR_MESSAGE}</Fragment>,
};

const mapComponentToWrapperProps = Component => ({Component});
const dynamic = (importPromise, preparation = noop) => prepare(
  () => Promise.all([
    preparation(),
    importPromise,
  ]).then(([, module]) => module.default),
  mapComponentToWrapperProps,
)(DynamicWrapped);

export default dynamic;
