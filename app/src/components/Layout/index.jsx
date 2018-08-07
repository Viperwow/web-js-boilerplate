import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

Layout.defaultProps = {
  children: [],
};

Layout.propTypes = {
  children: PropTypes.node,
};
