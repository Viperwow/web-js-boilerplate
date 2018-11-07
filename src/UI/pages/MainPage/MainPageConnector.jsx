// Vendors
import i18n from 'i18next';
// Common
import queried from 'src/common/queried';
// GQL
import {QUERY_LOCALE} from 'src/client-gql/locale';
// UI
import MainPage from '.';

const mapStateToProps = () => ({
  text: i18n.t('pages.main'),
});

export default queried(QUERY_LOCALE, mapStateToProps)(MainPage);
