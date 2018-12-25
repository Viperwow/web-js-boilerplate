// Vendors
const storybookReact = require('@storybook/react'); // eslint-disable-line import/no-extraneous-dependencies
// Stories
const stories = require('../../stories');

storybookReact.configure(() => stories, module);
