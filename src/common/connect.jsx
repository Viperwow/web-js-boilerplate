// Vendors
import React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {merge as _merge} from 'lodash';

const _mixPropsWithClient = (client, props = {}) => ({client, ...props});

const mergeProps = (
  client,
  props = {},
  mapStateToProps = _mixPropsWithClient,
  mapClientToProps = _mixPropsWithClient,
) => _merge(
  {...mapStateToProps({store: client.extract().ROOT_QUERY}, props)},
  {...mapClientToProps(client, props)},
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
