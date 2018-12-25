// Vendors
import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
// UI
import MainPage from 'src/UI/pages/MainPage';
import SecondPage from 'src/UI/pages/SecondPage';
import ThirdPage from 'src/UI/pages/ThirdPage';
import UnknownRoutePage from 'src/UI/pages/UnknownRoutePage';

storiesOf('Pages', module)
  .add('Main page', () => (
    <MainPage text="Main page" />
  ))
  .add('Second page', () => (
    <SecondPage text="Second page" />
  ))
  .add('Third page', () => (
    <ThirdPage text="Third page" />
  ))
  .add('Unknown route page', () => (
    <UnknownRoutePage text="Unknown route page" />
  ));
