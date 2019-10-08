import {identity as _identity} from 'lodash';
import React from 'react';

const Button = ({
  text,
  t = _identity,
}) => (
  <button type="submit" className="btn">
    {t(text)}
  </button>
);

export default Button;
