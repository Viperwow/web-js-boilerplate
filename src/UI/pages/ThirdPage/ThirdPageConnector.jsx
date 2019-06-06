import i18n from 'i18next';
import connectQuery from 'src/common/connectQuery';
import withOnError from 'src/common/withOnError';
import {compose} from 'src/helpers/utility';
import {LOCALE_QUERY} from 'src/queries';
import ThirdPage from './ThirdPage';

const mapStateToProps = () => ({
  text: i18n.t('pages.third'),
});

export default compose(
  connectQuery(LOCALE_QUERY, mapStateToProps),
  withOnError,
)(ThirdPage);
