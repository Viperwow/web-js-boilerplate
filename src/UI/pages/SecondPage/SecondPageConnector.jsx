// Vendors
import i18n from 'i18next';
// Common
import connectQuery from 'src/common/connectQuery';
// GQL
import QUERY_LOCALE from 'src/queries/locale';
// UI
import SecondPage from './SecondPage';

const mapStateToProps = () => ({
  text: i18n.t('pages.second'),
});

export default connectQuery(QUERY_LOCALE, mapStateToProps)(SecondPage);
