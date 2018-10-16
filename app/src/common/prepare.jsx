import * as React from 'react';

export default (
  preparation,
  processorSuccess = result => ({result: result || null}),
  processorError = error => ({error: error || null}),
) => Wrapped => class LoadableWrapper extends React.Component {
  state = {
    result: null,
    error: null,
    isPreparing: false,
  };

  _isMounted = false;

  _processPreparation = async () => {
    this.setState(prevState => ({
      ...prevState,
      isPreparing: true,
    }));

    return preparation(this.props);
  };

  _onProcessSuccess = result => {
    if (this._isMounted) {
      this.setState(prevState => ({
        ...prevState,
        ...processorSuccess(result),
      }));
    }
  };

  _onProcessError = error => {
    if (this._isMounted) {
      this.setState(prevState => ({
        ...prevState,
        ...processorError(error),
      }));
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this._processPreparation()
      .then(result => this._onProcessSuccess(result))
      .catch(error => this._onProcessError(error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <Wrapped {...this.props} {...this.state} />;
  }
};
