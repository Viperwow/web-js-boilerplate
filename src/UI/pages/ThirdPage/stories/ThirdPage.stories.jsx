import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import StoryRouter from 'storybook-react-router'; // eslint-disable-line import/no-extraneous-dependencies
import ThirdPage from '../ThirdPage';

const TEXT_PROP = 'Third page';

storiesOf('App/Pages', module)
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
  .add(
    'Third page',
    () => (<ThirdPage text={text('text', TEXT_PROP)} />),
    {decorators: [StoryRouter()]},
  );
