// Vendors
import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
// UI
import SecondPage from 'src/UI/pages/SecondPage';

storiesOf('Pages', module)
  .add('Second page', () => (
    <SecondPage text="Second page" />
  ));
