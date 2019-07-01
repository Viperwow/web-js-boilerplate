import connectQuery from 'src/common/connectQuery';
import withOnError from 'src/common/withOnError';
import withTranslate from 'src/common/withTranslate';
import {compose} from 'src/helpers/utility';
import {GET_APP_LOCALE} from 'src/queries';
import SecondPage from './SecondPage';

const mapStateToProps = (_, {t}) => ({
  text: t('pages.second'),
});

export default compose(
  withTranslate,
  connectQuery(GET_APP_LOCALE, mapStateToProps),
  withOnError,
)(SecondPage);
