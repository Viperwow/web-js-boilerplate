// Vendors
import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
// UI
import ThirdPage from '../ThirdPage';
// Constants
const TEXT_PROP = 'Third page';

storiesOf('Pages', module)
  .addParameters({
    info: {
      text: `
          Third page description
        `,
    },
  })
  .addParameters({
    jest: [
      'ThirdPage',
    ],
  })
  .add('Third page', () => (
    <ThirdPage text={text('text', TEXT_PROP)} />
  ));
