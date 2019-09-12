const postcssPresetEnv = require('postcss-preset-env'); // eslint-disable-line import/no-extraneous-dependencies
const cssnano = require('cssnano'); // eslint-disable-line import/no-extraneous-dependencies
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 1,
    }),
    postcssFlexbugsFixes({}),
    cssnano({
      preset: 'default',
      reduceIdents: {
        keyframes: false,
      },
      comments: {
        removeAll: true,
      },
    }),
  ],
};
