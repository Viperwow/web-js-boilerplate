// Vendors
import i18n from 'i18next';
import i18nBrowserLanguageDetector from 'i18next-browser-languagedetector';
// GQL
import MUTATION_LOCALE from 'src/mutations/locale';

const _localeNameMappings = { // Is needed for debugging purposes
  en: () => import('assets/locales/en.js' /* webpackChunkName: "en" */),
  ru: () => import('assets/locales/ru.js' /* webpackChunkName: "ru" */),
};

const getLocale = () => i18n.language.split('-')[0];

const _loadLocaleDynamically = async (locale = getLocale()) => {
  const localeModule = await _localeNameMappings[locale]();

  i18n.addResourceBundle(locale, 'translation', localeModule.default, true, true);
  document.title = i18n.t('document.title');
};

const _setStoreLocale = (client, locale = getLocale()) => {
  client.mutate({mutation: MUTATION_LOCALE, variables: {locale}});
};

const initLocale = client => new Promise((resolve, reject) => {
  i18n
    .use(i18nBrowserLanguageDetector) // To detect user's locale automatically
    .init({
      fallbackLng: ['en'], // If language is not found - get this one
      load: 'languageOnly', // Ignore something like 'en-EU', just look up for 'en'
      detection: { // All checks will use this pattern in their corresponding areas
        lookupQuerystring: 'locale',
        lookupCookie: 'locale',
        lookupLocalStorage: 'locale',
      },
    }, async error => {
      if (error) {
        reject(error);
      } else {
        await _loadLocaleDynamically(getLocale());
        _setStoreLocale(client, getLocale());

        i18n.on('languageChanged', async locale => {
          await _loadLocaleDynamically(locale);
          _setStoreLocale(client, locale);
        });

        resolve(getLocale());
      }
    });
});

const _setI18nLocale = (locale = getLocale()) => new Promise((resolve, reject) => {
  i18n.changeLanguage(locale, error => {
    if (error) {
      reject(error);
    } else {
      resolve(getLocale());
    }
  });
});

const setLocale = (locale = getLocale()) => _setI18nLocale(locale);

export {
  getLocale,
  initLocale,
  setLocale,
};
