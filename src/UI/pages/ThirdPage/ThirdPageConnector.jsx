import i18n from 'i18next';
import connectQuery from 'src/common/connectQuery';
import {LOCALE_QUERY} from 'src/queries';
import ThirdPage from './ThirdPage';

const mapStateToProps = () => ({
  text: i18n.t('pages.third'),
});

export default connectQuery(LOCALE_QUERY, mapStateToProps)(ThirdPage);
