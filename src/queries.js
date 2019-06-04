import gql from 'graphql-tag';

export const LOCALE_QUERY = gql`
  query getLocale {
    locale @client
  }
`;
