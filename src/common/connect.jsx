import React from 'react';
import {ApolloConsumer} from 'react-apollo';
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


/* It is the same same as the `connectQuery`,
* but listens to the whole store state changes, instead of the query-related store part.
* You should use it only when you want to migrate from redux to apollo */
const connect = (
  query,
  mapStateToProps,
  mapClientToProps,
) => Wrapped => props => (
  <ApolloConsumer>
    {({client}) => (
      <Wrapped {...{
        ..._mergeProps(
          client,
          props,
          mapStateToProps,
          mapClientToProps,
        ),
      }}
      />
    )}
  </ApolloConsumer>
);

export default connect;
