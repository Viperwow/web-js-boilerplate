import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import Layout from 'src/UI/layouts/Layout';
import {
  getApolloClient,
  initApolloClient,
} from 'src/helpers/apollo';

initApolloClient();

ReactDOM.render(
  <ApolloProvider client={getApolloClient()}>
    <Layout />
  </ApolloProvider>,
  document.querySelector('app'),
);
