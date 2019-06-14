import i18n from 'i18next';

const ru = {
  document: {
    title: 'Web-js-бойлерплейт',
  },
  pages: {
    main: 'Главная страница',
    second: 'Вторая страница',
    third: 'Третья страница',
    unknown: 'Неизвестная страница',
  },
  components: {
    loader: 'Загрузка...',
  },
};

export default ru;

if (module.hot) {
  module.hot.accept();

  i18n.addResourceBundle('ru', 'translation', ru, true, true);
  document.title = i18n.t('document.title');
}
