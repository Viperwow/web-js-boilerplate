import connectQuery from 'src/common/connectQuery';
import withOnError from 'src/common/withOnError';
import withTranslate from 'src/common/withTranslate';
import {compose} from 'src/helpers/utility';
import {GET_APP_LOCALE} from 'src/queries';
import ThirdPage from './ThirdPage';

const mapStateToProps = (_, {t}) => ({
  text: t('pages.third'),
});

export default compose(
  withTranslate,
  connectQuery(GET_APP_LOCALE, mapStateToProps),
  withOnError,
)(ThirdPage);
