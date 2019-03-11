import {hot} from 'react-hot-loader'; // Is being used to save React components state after HRM
import Layout from 'src/UI/layouts/Layout/index';
import prepare from 'src/common/prepare';
import connect from 'src/common/connect';
import {initLocale} from 'src/helpers/locale';
import {initHistory} from 'src/helpers/history';

const initialPreparations = async ({client}) => {
  initHistory();
  await initLocale(client);
};

export default hot(module)(
  connect()(prepare({preparation: initialPreparations})(Layout)),
);
