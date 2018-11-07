// Vendors
import i18n from 'i18next';
import i18nBrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18nFetchBackend from 'i18next-fetch-backend';
// GQL
import {MUTATION_LOCALE} from 'src/client-gql/locale';

const _setStoreLocale = (client, locale = i18n.language) => {
  client.mutate({mutation: MUTATION_LOCALE, variables: {locale}});
};

const getLocale = () => i18n.language;

const initLocale = client => new Promise((resolve, reject) => {
  i18n
    .use(i18nBrowserLanguageDetector) // To detect user's locale automatically
    .use(i18nFetchBackend) // To dynamically load translations
    .init({
      fallbackLng: ['en'], // If language is not found - get this one
      load: 'languageOnly', // Ignore something like 'en-EU', just look up for 'en'
      detection: { // All checks will use this pattern in their corresponding areas
        lookupQuerystring: 'locale',
        lookupCookie: 'locale',
        lookupLocalStorage: 'locale',
      },
      backend: {
        loadPath: 'assets/locales/{{lng}}.json',
      },
    }, error => {
      if (error) {
        reject(error);
      } else {
        _setStoreLocale(client, getLocale());

        i18n.on('languageChanged', locale => {
          _setStoreLocale(client, locale);
        });

        resolve(getLocale());
      }
    });
});

const _setI18nLocale = (locale = i18n.language) => new Promise((resolve, reject) => {
  i18n.changeLanguage(locale, error => {
    if (error) {
      reject(error);
    } else {
      resolve(getLocale());
    }
  });
});

const setLocale = (locale = i18n.language) => _setI18nLocale(locale);

export {
  getLocale,
  initLocale,
  setLocale,
};
