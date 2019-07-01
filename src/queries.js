import gql from 'graphql-tag';

export const GET_APP_LOCALE = gql`
  query GetAppLocale {
    locale @client
  }
`;
