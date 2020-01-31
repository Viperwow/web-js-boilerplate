import withTranslate from 'src/common/withTranslate';
import connectQuery from 'src/common/connectQuery';
import {compose} from 'src/helpers/utility';
import {GET_APP_LOCALE} from 'src/queries';
import ButtonWithIcon from './ButtonWithIcon';

const mapStateToProps = () => ({
  text: 'components.button',
});

export default compose(
  withTranslate,
  connectQuery(GET_APP_LOCALE, mapStateToProps),
)(ButtonWithIcon);
