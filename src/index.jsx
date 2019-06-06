import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import InitLayout from 'src/helpers/init';
import ApolloExtendedClient from 'src/helpers/apollo';

ReactDOM.render(
  <ApolloProvider client={ApolloExtendedClient}>
    <InitLayout />
  </ApolloProvider>,
  document.querySelector('app'),
);
