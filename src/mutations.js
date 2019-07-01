import gql from 'graphql-tag';

export const SET_APP_LOCALE = gql`
  mutation SetAppLocale($locale: String) {
    setLocale(locale: $locale) @client
  }
`;
