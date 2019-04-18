// Vendors
import React from 'react';
import {Query} from 'react-apollo';
import {merge as _merge} from 'lodash';

const _doubleIdentity = (client, props = {}) => ({client, ...props});

const mergeProps = (
  client,
  props = {},
  mapStateToProps = _doubleIdentity,
  mapClientToProps = _doubleIdentity,
) => _merge(
  {...mapStateToProps({store: client.extract().ROOT_QUERY}, props)},
  {...mapClientToProps(client, props)},
);

const connectQuery = (
  query,
  mapStateToProps,
  mapClientToProps,
) => Wrapped => props => (
  <Query query={query}>
    {({client, ...restQueryProps}) => (
      <Wrapped {...{
        ...mergeProps(
          client,
          {
            ...props,
            query: restQueryProps,
          },
          mapStateToProps,
          mapClientToProps,
        ),
      }}
      />
    )}
  </Query>
);

export default connectQuery;
