export const setLocale = (_, {locale}, {cache}) => {
  cache.writeData({
    data: {
      locale,
    },
  });

  return locale;
};
