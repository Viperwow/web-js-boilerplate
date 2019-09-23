const postcssPresetEnv = require('postcss-preset-env'); // eslint-disable-line import/no-extraneous-dependencies
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes'); // eslint-disable-line import/no-extraneous-dependencies
const postcssTailwind = require('tailwindcss'); // eslint-disable-line import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies
const cssnano = require('cssnano'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 1,
    }),
    postcssTailwind,
    postcssFlexbugsFixes,
    autoprefixer({
      grid: 'autoplace',
    }),
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
