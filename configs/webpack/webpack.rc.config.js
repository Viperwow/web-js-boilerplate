// Vendors
const webpackMerge = require('webpack-merge');

// Configs
const ProductionWebpackConfig = require('./webpack.production.config');

module.exports = function productionWebpackConfig(data) {
  return webpackMerge(ProductionWebpackConfig(data), {
    devtool: 'inline-cheap-module-source-map' // Allows us to read production code without uglification
  });
};
