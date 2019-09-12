import connectQuery from 'src/common/connectQuery';
import withOnError from 'src/common/withOnError';
import withTranslate from 'src/common/withTranslate';
import {compose} from 'src/helpers/utility';
import {GET_APP_LOCALE} from 'src/queries';
import UnknownPage from './UnknownPage';

const mapStateToProps = () => ({
  text: 'pages.unknown',
});

export default compose(
  withTranslate,
  connectQuery(GET_APP_LOCALE, mapStateToProps),
  withOnError,
)(UnknownPage);
