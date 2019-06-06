import { // eslint-disable-line import/no-extraneous-dependencies
  addDecorator,
  configure,
} from '@storybook/react';
import { // eslint-disable-line import/no-extraneous-dependencies
  configureViewport,
  INITIAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import {withTests} from '@storybook/addon-jest'; // eslint-disable-line import/no-extraneous-dependencies
import {withInfo} from '@storybook/addon-info'; // eslint-disable-line import/no-extraneous-dependencies
import {withOptions} from '@storybook/addon-options'; // eslint-disable-line import/no-extraneous-dependencies
import {configureActions} from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies
import {withKnobs} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import results from '../../jest-results.json'; // eslint-disable-line import/no-unresolved

configureViewport({
  viewports: {
    ...INITIAL_VIEWPORTS,
  },
});

configureActions({
  limit: 20, // Limit the number of items logged into the actions panel
});

addDecorator( // It must be the first decorator declared or it might not work well
  withInfo({
    source: false, // Disable unnecessary source output duplication
  }),
);

addDecorator(
  withOptions({
    addonPanelInRight: true,
  }),
);

addDecorator(
  withTests({
    results,
    filesExt: '((\\.spec?)|(\\.test?)|(\\.steps?)|(\\.support?))?(\\.js(x)?)?(\\.flow?)?$', // Same as in the jest.config.js for consistency
  }),
);

addDecorator(withKnobs);

const loadStories = () => {
  /*
   Automatically import all story js(x) files that end with *.stories.js
   or *.stories.jsx with .flow extension or not
   */
  const req = require.context(
    '../../src',
    true,
    /\.stories\.js(x)?(.flow)?$/,
  );

  req.keys()
    .forEach(filename => req(filename));
};

configure(loadStories, module);
