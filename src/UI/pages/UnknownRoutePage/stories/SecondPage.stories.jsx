// Vendors
import React from 'react';
import {storiesOf} from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
// UI
import UnknownRoutePage from 'src/UI/pages/UnknownRoutePage';

storiesOf('Pages', module)
  .add('Unknown route page', () => (
    <UnknownRoutePage text="Unknown route page" />
  ));
