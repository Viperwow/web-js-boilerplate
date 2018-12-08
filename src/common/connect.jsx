// Vendors
import React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {merge} from 'lodash';

const _doubleIdentity = (client, props = {}) => ({client, ...props});

const mergeProps = (
  client,
  props = {},
  mapStateToProps = _doubleIdentity,
  mapClientToProps = _doubleIdentity,
) => merge(
  Object.assign({}, mapStateToProps({store: client.extract().ROOT_QUERY}, props)),
  Object.assign({}, mapClientToProps(client, props)),
);

const connect = (
  mapStateToProps,
  mapClientToProps,
) => Wrapped => props => (
  <ApolloConsumer>
    {client => (
      <Wrapped {...{...mergeProps(client, props, mapStateToProps, mapClientToProps)}} />
    )}
  </ApolloConsumer>
);

export default connect;
