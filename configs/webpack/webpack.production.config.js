// Vendors
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const webpackMerge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const TerserWebpackPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default; // eslint-disable-line import/no-extraneous-dependencies
const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

// Configs
const makeBaseWebpackConfig = require('./webpack.base.config');

// Constants
const {PROJECT_DIST_NAME} = require('./constants');

// Paths
const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const DIST = path.join(ROOT_PATH, `/${PROJECT_DIST_NAME}`);

module.exports = function makeProductionWebpackConfig(data) {
  return webpackMerge(makeBaseWebpackConfig(data), {
    output: {
      path: DIST,
    },
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          cache: true,
          parallel: true, // Uses all cores available on given machine
          terserOptions: {
            compress: {
              drop_console: true,
              warnings: false,
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(PROJECT_DIST_NAME, {
        root: ROOT_PATH,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new ImageminWebpackPlugin({
        test: /\.(svg|png|gif|jpe?g)$/,
        svgo: {
          removeTitle: true,
          removeDesc: true,
        },
      }),
    ],
  });
};
