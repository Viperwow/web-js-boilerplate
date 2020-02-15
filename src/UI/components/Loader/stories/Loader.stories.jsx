import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Loader from '../Loader';

const TEXT_PROP = 'Loader';

storiesOf('Components/Base', module)
  .addParameters({
    info: {
      text: `
          Loader description
        `,
    },
  })
  .addParameters({
    jest: [
      'Loader',
    ],
  })
  .add(
    'Loader',
    () => (<Loader text={text('text', TEXT_PROP)} />),
  );
