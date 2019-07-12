import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import StoryRouter from 'storybook-react-router'; // eslint-disable-line import/no-extraneous-dependencies
import SecondPage from '../SecondPage';

const TEXT_PROP = 'Second page';

storiesOf('App/Pages', module)
  .addParameters({
    info: {
      text: `
          Second page description
        `,
    },
  })
  .addParameters({
    jest: [
      'SecondPage',
    ],
  })
  .add(
    'Second page',
    () => (<SecondPage text={text('text', TEXT_PROP)} />),
    {decorators: [StoryRouter()]},
  );
