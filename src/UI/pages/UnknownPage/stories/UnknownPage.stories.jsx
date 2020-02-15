import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import UnknownPage from '../UnknownPage';

const TEXT_PROP = 'Unknown page';

storiesOf('App/Pages', module)
  .addParameters({
    info: {
      text: `
          Unknown page description
        `,
    },
  })
  .addParameters({
    jest: [
      'UnknownPage',
    ],
  })
  .add(
    'Unknown page',
    () => (<UnknownPage text={text('text', TEXT_PROP)} />),
  );
