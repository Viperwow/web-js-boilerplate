import React from 'react';
import i18next from 'i18next';

const t = i18next.t.bind(i18next);

const withTranslate = Wrapped => props => (
  <Wrapped {...props} t={t} />
);

export default withTranslate;
