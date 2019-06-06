import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import InitLayout from 'src/helpers/init';
import {
  getApolloClient,
  initApolloClient,
} from 'src/helpers/apollo';

initApolloClient();

ReactDOM.render(
  <ApolloProvider client={getApolloClient()}>
    <InitLayout />
  </ApolloProvider>,
  document.querySelector('app'),
);
