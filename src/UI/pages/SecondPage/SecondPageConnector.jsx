import i18n from 'i18next';
import connectQuery from 'src/common/connectQuery';
import {LOCALE_QUERY} from 'src/queries';
import SecondPage from './SecondPage';

const mapStateToProps = () => ({
  text: i18n.t('pages.second'),
});

export default connectQuery(LOCALE_QUERY, mapStateToProps)(SecondPage);
