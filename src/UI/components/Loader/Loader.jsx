import {identity as _identity} from 'lodash';

const Loader = ({
  text,
  t = _identity,
}) => t(text);

export default Loader;
