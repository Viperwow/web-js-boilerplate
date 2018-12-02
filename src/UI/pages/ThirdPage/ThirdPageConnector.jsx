// Vendors
import i18n from 'i18next';
// Common
import queried from 'src/common/queried';
// GQL
import QUERY_LOCALE from 'src/queries/locale';
// UI
import ThirdPage from '.';

const mapStateToProps = () => ({
  text: i18n.t('pages.third'),
});

export default queried(QUERY_LOCALE, mapStateToProps)(ThirdPage);
