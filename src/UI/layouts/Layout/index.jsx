import {hot} from 'react-hot-loader'; // Is being used to save React components state after HRM
import {withApollo} from 'react-apollo';
import prepare from 'src/common/prepare';
import withOnError from 'src/common/withOnError';
import {compose} from 'src/helpers/utility';
import {initLocale} from 'src/helpers/locale';
import {initHistory} from 'src/helpers/history';
import Layout from './Layout';

const initialPreparation = async ({client}) => {
  initHistory();
  await initLocale(client);
};

export default compose(
  hot(module),
  withApollo,
  prepare({preparation: initialPreparation}),
  withOnError,
)(Layout);
