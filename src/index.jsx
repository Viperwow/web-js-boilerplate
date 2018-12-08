// Vendors
import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
// UI
import InitLayout from 'src/helpers/init';
// Apollo client-gql
import ApolloExtendedClient from 'src/helpers/apollo';

ReactDOM.render(
  <ApolloProvider client={ApolloExtendedClient}>
    <InitLayout />
  </ApolloProvider>,
  document.querySelector('app'),
);
