// Vendors
import gql from 'graphql-tag';

const QUERY_LOCALE = gql`
  query getLocale {
    locale @client
  }
`;

export default QUERY_LOCALE;
