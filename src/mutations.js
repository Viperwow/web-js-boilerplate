import gql from 'graphql-tag';

export const LOCALE_MUTATION = gql`
  mutation setLocale($locale: String) {
    setLocale(locale: $locale) @client
  }
`;
