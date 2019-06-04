import {hot} from 'react-hot-loader'; // Is being used to save React components state after HRM
import {withApollo} from 'react-apollo';
import Layout from 'src/UI/layouts/Layout/index';
import prepare from 'src/common/prepare';
import {compose} from 'src/helpers/utility';
import {initLocale} from 'src/helpers/locale';
import {initHistory} from 'src/helpers/history';

const initialPreparations = async ({client}) => {
  initHistory();
  await initLocale(client);
};

export default compose(
  hot(module),
  withApollo,
  prepare({preparation: initialPreparations}),
)(Layout);
