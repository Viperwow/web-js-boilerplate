// Vendors
const storybookReact = require('@storybook/react'); // eslint-disable-line import/no-extraneous-dependencies

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

  req.keys().forEach(filename => req(filename));
};

storybookReact.configure(loadStories, module);
