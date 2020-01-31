import {identity as _identity} from 'lodash';
import React from 'react';
import Button from 'src/UI/components/Button/Button';
import EyeIcon from 'assets/img/eye.svg';

const ButtonWithIcon = ({
  text,
  t = _identity,
}) => (
  <div className="flex flex-row items-center">
    <EyeIcon className="mr-2" />
    <Button t={t} text={t(text)} />
  </div>
);

export default ButtonWithIcon;
