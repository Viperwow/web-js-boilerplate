import i18n from 'i18next';
import connectQuery from 'src/common/connectQuery';
import {LOCALE_QUERY} from 'src/queries';
import MainPage from './MainPage';

const mapStateToProps = () => ({
  text: i18n.t('pages.main'),
});

export default connectQuery(LOCALE_QUERY, mapStateToProps)(MainPage);
