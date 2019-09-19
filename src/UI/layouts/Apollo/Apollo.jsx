import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {
  getApolloClient,
  initApolloClient,
} from 'src/helpers/apollo';
import App from 'src/UI/layouts/App';

const Apollo = () => {
  initApolloClient();

  return (
    <ApolloProvider client={getApolloClient()}>
      <App />
    </ApolloProvider>
  );
};

export default Apollo;
