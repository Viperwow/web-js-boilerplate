// Vendors
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Configs
const BaseWebpackConfig = require('./webpack.base.config');
const DevServerConfig = require('./devserver.config');

module.exports = function developmentWebpackConfig(data) {
  return webpackMerge(BaseWebpackConfig(data), {
    devtool: 'inline-cheap-module-source-map', // Allows us to read code without uglification
    devServer: DevServerConfig,
    plugins: [
      new ExtractTextPlugin({
        disable: true
      }),
      new webpack.NamedModulesPlugin(), // Is used to find out which module changed (for example, while HMR is active)
      new webpack.HotModuleReplacementPlugin() // Is used to enable hot module replacement (HMR) (see https://webpack.js.org/plugins/hot-module-replacement-plugin/ for more info)
    ]
  });
};

