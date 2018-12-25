// Vendors
import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
// UI
import MainPage from 'src/UI/pages/MainPage';

storiesOf('Pages', module)
  .add('Main page', () => (
    <MainPage text="Main page" />
  ));
