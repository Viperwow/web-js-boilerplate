// Vendors
import i18n from 'i18next';
// Common
import queried from 'src/common/queried';
// GQL
import {QUERY_LOCALE} from 'src/client-gql/locale';
// UI
import SecondPage from '.';

const mapStateToProps = () => ({
  text: i18n.t('pages.second'),
});

export default queried(QUERY_LOCALE, mapStateToProps)(SecondPage);