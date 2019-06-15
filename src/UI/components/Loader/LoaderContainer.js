import withTranslate from 'src/common/withTranslate';
import connectQuery from 'src/common/connectQuery';
import {compose} from 'src/helpers/utility';
import {LOCALE_QUERY} from 'src/queries';
import Loader from './Loader';

const mapStateToProps = (_, {t}) => ({
  text: t('components.loader'),
});

export default compose(
  withTranslate,
  connectQuery(LOCALE_QUERY, mapStateToProps),
)(Loader);
