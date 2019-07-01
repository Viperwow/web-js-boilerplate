import i18n from 'i18next';
import i18nBrowserLanguageDetector from 'i18next-browser-languagedetector';
import {SET_APP_LOCALE} from 'src/mutations';

const LOCALE_NAME_MAPPINGS = { // Is needed for debugging purposes
  en: () => import('assets/locales/en.js' /* webpackChunkName: "en" */),
  ru: () => import('assets/locales/ru.js' /* webpackChunkName: "ru" */),
};

const _getLocaleData = async locale => {
  const localeModule = await LOCALE_NAME_MAPPINGS[locale]();

  return localeModule.default;
};

export const getLocale = () => i18n.language.split('-')[0];

const _setLocaleData = async locale => {
  i18n.addResourceBundle(locale, 'translation', await _getLocaleData(locale), true, true);
};

const _setStoreLocale = (client, locale) => {
  client.mutate({mutation: SET_APP_LOCALE, variables: {locale}});
};

const _setDocumentTitle = () => {
  document.title = i18n.t('document.title');
};

const _updateLocale = async (client, locale) => {
  await _setLocaleData(locale);
  _setStoreLocale(client, locale);
  _setDocumentTitle();
};

const _addLocaleChangeListener = client => {
  i18n.on('languageChanged', locale => {
    _updateLocale(client, locale);
  });
};

export const initLocale = client => new Promise((resolve, reject) => {
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
        const locale = getLocale();

        await _updateLocale(client, locale);
        _addLocaleChangeListener(client);

        resolve(locale);
      }
    });
});

export const setLocale = (locale = getLocale()) => new Promise((resolve, reject) => {
  i18n.changeLanguage(locale, error => {
    if (error) {
      reject(error);
    } else {
      resolve(getLocale());
    }
  });
});
