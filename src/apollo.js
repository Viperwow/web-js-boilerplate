// Vendors
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {
  ApolloLink,
  split,
} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

/*
 Using the ability to split links, you can send data to each link
 depending on what kind of operation is being sent
 */
const extendedLink = split(
  // Split based on operation type
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  // Create a WebSocket link
  new WebSocketLink({
    uri: 'ws://localhost:5000/',
    options: {
      reconnect: true,
    },
  }),
  // Create an http link
  new HttpLink({
    uri: 'https://launchpad.graphql.com/j90lv4pm5p', // 'http://localhost:3000/graphql',
  }),
);
const ApolloExtendedClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        // eslint-disable-next-line no-console
        graphQLErrors.map(({message, locations, path}) => console.log(`[GraphQL error]:
         Message: ${message},
         Location: ${locations},
         Path: ${path}`));
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`); // eslint-disable-line no-console
      }
    }),
    extendedLink,
  ]),
  cache: new InMemoryCache(),
});

export default ApolloExtendedClient;
