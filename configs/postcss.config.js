// Vendors
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 1
    }),
    cssnano({
      preset: 'default',
      reduceIdents: {
        keyframes: false
      },
      comments: {
        removeAll: true
      }
    })
  ]
};
