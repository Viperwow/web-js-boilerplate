const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const webpackMerge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin'); // eslint-disable-line import/no-extraneous-dependencies

const makeBaseWebpackConfig = require('./webpack.base.config');
const DevServerConfig = require('./devserver.config');

const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const NODE_MODULES_PATH = path.join(ROOT_PATH, '/node_modules');

module.exports = function makeDevelopmentWebpackConfig(data) {
  return webpackMerge(makeBaseWebpackConfig(data), {
    devtool: 'inline-cheap-module-source-map', // Allows us to read code without uglification
    devServer: DevServerConfig,
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // Is used to enable hot module replacement (HMR) (see https://webpack.js.org/plugins/hot-module-replacement-plugin/ for more info)
      new WatchMissingNodeModulesPlugin(NODE_MODULES_PATH), // Is needed to trigger re-compilation of the node modules on their change
    ],
  });
};
