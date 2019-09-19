import withOnError from 'src/common/withOnError';
import {compose} from 'src/helpers/utility';
import Layout from './Layout';

export default compose(withOnError)(Layout);
