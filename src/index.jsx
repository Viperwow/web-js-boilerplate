// Vendors
import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
// UI
import Layout from 'src/layout';
// Apollo client
import ApolloExtendedClient from 'src/apollo';

ReactDOM.render(
  <ApolloProvider client={ApolloExtendedClient}>
    <Layout />
  </ApolloProvider>,
  document.querySelector('app'),
);
