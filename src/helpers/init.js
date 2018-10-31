// Vendors
import {hot} from 'react-hot-loader'; // Is being used to save React components state after HRM
// Layouts
import Layout from 'src/UI/layouts/Layout/index';
// Common
import prepare from 'src/common/prepare';
import connect from 'src/common/connect';
// Helpers
import {initLocale} from 'src/helpers/locale';

export default hot(module)(
  connect()(
    prepare(async ({client}) => {
      await initLocale(client);

      return client;
    })(Layout),
  ),
);
