// Vendors
import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
// UI
import ThirdPage from 'src/UI/pages/ThirdPage';

storiesOf('Pages', module)
  .add('Third page', () => (
    <ThirdPage text="Third page" />
  ));
