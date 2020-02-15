import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import ButtonWithIcon from '../ButtonWithIcon';

const TEXT_PROP = 'ButtonWithIcon';

storiesOf('Components/Base', module)
  .addParameters({
    info: {
      text: `
          ButtonWithIcon description
        `,
    },
  })
  .addParameters({
    jest: [
      'ButtonWithIcon',
    ],
  })
  .add(
    'ButtonWithIcon',
    () => (<ButtonWithIcon text={text('text', TEXT_PROP)} />),
  );
