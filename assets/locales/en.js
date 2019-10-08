import i18n from 'i18next';

const en = {
  document: {
    title: 'Web-js-boilerplate',
  },
  pages: {
    main: 'Main page',
    second: 'Second page',
    third: 'Third page',
    unknown: 'Unknown page',
  },
  components: {
    loader: 'Loading...',
    button: 'Button',
  },
};

export default en;

if (module.hot) {
  module.hot.accept();

  i18n.addResourceBundle('en', 'translation', en, true, true);
  document.title = i18n.t('document.title');
}
