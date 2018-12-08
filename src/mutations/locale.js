// Vendors
import gql from 'graphql-tag';

const MUTATION_LOCALE = gql`
  mutation setLocale($locale: String) {
    setLocale(locale: $locale) @client
  }
`;

export default MUTATION_LOCALE;
