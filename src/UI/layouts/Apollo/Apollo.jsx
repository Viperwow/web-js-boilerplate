import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {getApolloClient} from 'src/helpers/apollo';
import App from 'src/UI/layouts/App';

const Apollo = () => (
  <ApolloProvider client={getApolloClient()}>
    <App />
  </ApolloProvider>
);

export default Apollo;
