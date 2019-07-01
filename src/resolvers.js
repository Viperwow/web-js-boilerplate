import {getLocale as getI18nLocale} from 'src/helpers/locale';

export const setLocale = (_, {locale}, {cache}) => {
  cache.writeData({
    data: {
      locale,
    },
  });

  return locale;
};

export const getLocale = () => getI18nLocale();

export default {
  setLocale,
  getLocale,
};
