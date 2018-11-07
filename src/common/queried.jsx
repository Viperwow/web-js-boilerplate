// Vendors
import React, {Component} from 'react';
import {Query} from 'react-apollo';
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
  query,
  mapStateToProps,
  mapClientToProps,
) => Wrapped => class Connected extends Component {
  render() {
    return (
      <Query query={query}>
        {({client, ...restQueryProps}) => (
          <Wrapped {...{
            ...mergeProps(
              client,
              {
                ...this.props,
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
  }
};

export default connect;
