import prepare from 'src/common/prepare';
import withOnError from 'src/common/withOnError';
import {initApolloClient} from 'src/helpers/apollo';
import {compose} from 'src/helpers/utility';
import Apollo from './Apollo';

const initialPreparation = () => {
  initApolloClient();
};

export default compose(
  prepare({preparation: initialPreparation}),
  withOnError,
)(Apollo);
