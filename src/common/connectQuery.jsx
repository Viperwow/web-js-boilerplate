import React from 'react';
import {Query} from 'react-apollo';
import {merge as _merge} from 'lodash';

const _secondParameterIdentity = (_, props) => props;

const _getStateFromClient = client => client.extract().ROOT_QUERY;

const _mergeProps = (
  client,
  props = {},
  mapStateToProps = _secondParameterIdentity,
  mapClientToProps = _secondParameterIdentity,
) => _merge(
  {...mapStateToProps(_getStateFromClient(client), props)},
  {...mapClientToProps(client, props)},
);

const connectQuery = (
  query,
  mapStateToProps,
  mapClientToProps,
) => Wrapped => props => (
  <Query query={query}>
    {({client, ...queryProps}) => (
      <Wrapped {...{
        ..._mergeProps(
          client,
          {
            ...props,
            query: queryProps,
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
