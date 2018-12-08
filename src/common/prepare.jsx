// Vendors
import React, {Component} from 'react';

export default (
  preparation,
  processorSuccess = result => ({result: result || null}),
  processorError = error => ({error: error || null}),
) => Wrapped => class Prepared extends Component {
  state = {
    result: null,
    error: null,
    isPreparing: true,
  };

  _isMounted = false;

  _processPreparation = async () => preparation(this.props); // Coercion to convert the result of the operation to the Promise

  _onProcessSuccess = result => {
    if (this._isMounted) {
      this.setState(prevState => ({
        ...prevState,
        isPreparing: false,
        result,
      }));
    }
  };

  _onProcessError = error => {
    if (this._isMounted) {
      this.setState(prevState => ({
        ...prevState,
        isPreparing: false,
        error,
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
    const {
      result,
      error,
      isPreparing,
    } = this.state;
    const providedState = {
      ...processorSuccess(result),
      ...processorError(error),
    };

    return !isPreparing
      && <Wrapped {...this.props} {...providedState} />;
  }
};
