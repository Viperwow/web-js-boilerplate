// Vendors
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    cssnext({
      warnForDuplicates: false // We want to turn it off because cssnano do some work using autoprefixer and therefore cssnext think that there are duplicates (see https://github.com/MoOx/postcss-cssnext/issues/388 for more info)
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
