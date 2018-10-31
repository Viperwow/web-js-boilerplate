import React, {Component} from 'react';
import {ApolloConsumer} from 'react-apollo';
import {
  identity,
  merge,
} from 'lodash';

const doubleIdentity = (client, reactProps = {}) => ({client, ...reactProps});
const dataExtractor = (
  client,
  reactProps = {},
  callback = identity,
) => callback(client.extract(), reactProps);
const dataDispatcher = (
  client,
  reactProps = {},
  callback = identity,
) => callback(client, reactProps);
const connect = (
  mapStateToProps = doubleIdentity,
  mapClientToProps = doubleIdentity,
) => Wrapped => class Connected extends Component {
  render() {
    const mergeProps = (client, reactProps = {}) => merge(
      Object.assign({}, dataExtractor(client, reactProps, mapStateToProps)),
      Object.assign({}, dataDispatcher(client, reactProps, mapClientToProps)),
    );

    return (
      <ApolloConsumer>
        {client => (
          <Wrapped {...{...mergeProps(client, this.props)}} />
        )}
      </ApolloConsumer>
    );
  }
};

export default connect;
