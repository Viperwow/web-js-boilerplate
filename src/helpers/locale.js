// Vendors
import i18n from 'i18next';
import i18nBrowserLanguageDetector from 'i18next-browser-languagedetector';
// GQL
import MUTATION_LOCALE from 'src/mutations/locale';

const _loadLocaleDynamically = async (locale = i18n.language) => {
  const localeModule = await import(`assets/locales/${locale}.js`);

  i18n.addResourceBundle(locale, 'translation', localeModule.default, true, true);
  document.title = i18n.t('document.title');
};

const _setStoreLocale = (client, locale = i18n.language) => {
  client.mutate({mutation: MUTATION_LOCALE, variables: {locale}});
};

const getLocale = () => i18n.language;

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
