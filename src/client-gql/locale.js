// Vendors
import gql from 'graphql-tag';

const setLocale = (_, {locale}, {cache}) => {
  cache.writeData({
    data: {
      locale,
    },
  });

  return locale;
};

const LOCALE_DEFAULTS = {
  locale: 'en',
};

const TYPE_DEF_LOCALE = 'setLocale(locale: String): String';

const QUERY_LOCALE = gql`
  query getLocale {
    locale @client
  }
`;

const MUTATION_LOCALE = gql`
  mutation setLocale($locale: String) {
    setLocale(locale: $locale) @client
  }
`;

export {
  setLocale,
  LOCALE_DEFAULTS,
  TYPE_DEF_LOCALE,
  QUERY_LOCALE,
  MUTATION_LOCALE,
};
