import connectQuery from 'src/common/connectQuery';
import withOnError from 'src/common/withOnError';
import withTranslate from 'src/common/withTranslate';
import {compose} from 'src/helpers/utility';
import {LOCALE_QUERY} from 'src/queries';
import MainPage from './MainPage';

const mapStateToProps = (_, {t}) => ({
  text: t('pages.main'),
});

export default compose(
  withTranslate,
  connectQuery(LOCALE_QUERY, mapStateToProps),
  withOnError,
)(MainPage);
