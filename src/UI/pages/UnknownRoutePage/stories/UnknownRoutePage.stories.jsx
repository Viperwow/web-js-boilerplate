// Vendors
import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
// UI
import UnknownRoutePage from 'src/UI/pages/UnknownRoutePage';
// Constants
const TEXT_PROP = 'Unknown route page';

storiesOf('Pages', module)
  .addParameters({
    info: {
      text: `
          Unknown route page description
        `,
    },
  })
  .addParameters({
    jest: [
      'UnknownRoutePage',
    ],
  })
  .add('Unknown route page', () => (
    <UnknownRoutePage text={text('text', TEXT_PROP)} />
  ));
