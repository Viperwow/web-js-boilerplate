import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import {text} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import StoryRouter from 'storybook-react-router'; // eslint-disable-line import/no-extraneous-dependencies
import Button from '../Button';

const TEXT_PROP = 'Button';

storiesOf('Components/Base', module)
  .addParameters({
    info: {
      text: `
          Button description
        `,
    },
  })
  .addParameters({
    jest: [
      'Button',
    ],
  })
  .add(
    'Button',
    () => (<Button text={text('text', TEXT_PROP)} />),
    {decorators: [StoryRouter()]},
  );
