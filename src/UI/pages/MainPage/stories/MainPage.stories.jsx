// Vendors
import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
// UI
import MainPage from '../MainPage';
// Constants
const TEXT_PROP = 'Main page';

storiesOf('Pages', module)
  .addParameters({
    info: {
      text: `
          Main page description
        `,
    },
  })
  .addParameters({
    jest: [
      'MainPage',
    ],
  })
  .add('Main page', () => (
    <MainPage text={text('text', TEXT_PROP)} />
  ));
