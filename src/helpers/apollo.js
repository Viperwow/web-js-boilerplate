import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {RetryLink} from 'apollo-link-retry';
import typeDefs from 'src/typeDefs';
import {
  getLocale,
  setLocale,
} from 'src/resolvers';

let _apolloClient = null;

export const initApolloClient = () => {
  const cache = new InMemoryCache(); // Create apollo cache (same thing as meant as Redux app's 'local state')

  const httpLink = new HttpLink({
    uri: 'https://codesandbox.io/embed/apollo-server-pfmg5', // 'http://localhost:3000/graphql',
  });

  const errorLink = onError(({graphQLErrors, networkError}) => { // Just handles errors (log it, for example)
    if (graphQLErrors) {
      graphQLErrors.forEach(({message, locations, path}) => {
        console.error(`[Apollo GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`); // eslint-disable-line max-len, no-console
      });
    }

    if (networkError) {
      console.error(`[Apollo network error]: ${networkError}`); // eslint-disable-line no-console
    }
  });

  const retryLink = new RetryLink(); // To retry failed or time-outed http requests

  _apolloClient = new ApolloClient({
    cache,
    typeDefs,
    resolvers: {
      Mutation: {
        setLocale,
      },
      Query: {
        locale: getLocale,
      },
    },
    link: errorLink.concat( // Fourth: get an error if something totally went wrong
      retryLink.concat( // Third: retry request if there were network error
        httpLink, // Second: try to request something via GQL request
      ),
    ),
  });

  // Defaults
  cache.writeData({
    data: {
      locale: 'en',
    },
  });
};

export const getApolloClient = () => _apolloClient;
