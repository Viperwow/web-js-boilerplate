import i18n from 'i18next';
import connectQuery from 'src/common/connectQuery';
import {LOCALE_QUERY} from 'src/queries';
import UnknownRoutePage from './UnknownRoutePage';

const mapStateToProps = () => ({
  text: i18n.t('pages.unknown'),
});

export default connectQuery(LOCALE_QUERY, mapStateToProps)(UnknownRoutePage);
