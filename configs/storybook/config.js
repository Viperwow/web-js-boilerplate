import { // eslint-disable-line import/no-extraneous-dependencies
  addParameters,
  addDecorator,
  configure,
} from '@storybook/react';
import {withTests} from '@storybook/addon-jest'; // eslint-disable-line import/no-extraneous-dependencies
import {withInfo} from '@storybook/addon-info'; // eslint-disable-line import/no-extraneous-dependencies
import {configureActions} from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies
import {withKnobs} from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import results from '../../jest-results.json'; // eslint-disable-line import/no-unresolved

addDecorator( // It must be the first decorator declared or it might not work well
  withInfo({
    source: false, // Disable unnecessary source output duplication
  }),
);

configureActions({
  limit: 20, // Limit the number of items logged into the actions panel
});

addDecorator(
  withTests({
    results,
    filesExt: '((\\.spec?)|(\\.test?)|(\\.steps?)|(\\.support?))?(\\.js(x)?)?(\\.flow?)?$', // Same as in the jest.config.js for consistency
  }),
);

addDecorator(withKnobs);

addParameters({
  options: {
    panelPosition: 'right',
  },
  viewport: {},
});

const loadStories = () => {
  /*
   Automatically import all story js(x) files that end with *.stories.js
   or *.stories.jsx with .flow extension or not
   */
  const requiredStoriesContext = require.context(
    '../../src',
    true,
    /\.stories\.js(x)?(.flow)?$/,
  );

  requiredStoriesContext.keys()
    .forEach(filename => requiredStoriesContext(filename));
};

configure(loadStories, module);
