import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {withClientState} from 'apollo-link-state';
import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {RetryLink} from 'apollo-link-retry';
import {LOCALE_TYPE_DEF} from 'src/typedefs';
import {setLocale} from 'src/resolvers';

let _apolloClient = null;

export const initApolloClient = () => {
  const cache = new InMemoryCache(); // Create apollo cache (same thing as meant as Redux app's 'local state')

  const httpLink = new HttpLink({
    uri: 'https://launchpad.graphql.com/j90lv4pm5p', // 'http://localhost:3000/graphql',
  });

  const localStateLink = withClientState({ // Allows you provide defaults to the 'local state'
    cache,
    defaults: {
      locale: 'en',
    },
    typeDefs: `
    type Mutation {
      ${LOCALE_TYPE_DEF},
    }
  `,
    resolvers: {
      Mutation: {
        setLocale,
      },
    },
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
    link: errorLink.concat( // Fourth: get an error if something totally went wrong
      retryLink.concat( // Third: retry request if there were network error
        ApolloLink.from([ // Mix links into a single link
          localStateLink, // First: address to local cache and try to get data from here
          httpLink, // Second: try to request something via GQL request
        ]),
      ),
    ),
  });
};

export const getApolloClient = () => _apolloClient;
