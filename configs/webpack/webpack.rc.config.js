// Vendors
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const webpackMerge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const TerserWebpackPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default; // eslint-disable-line import/no-extraneous-dependencies

// Configs
const BaseWebpackConfig = require('./webpack.base.config');

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const DIST = path.join(ROOT_PATH, '/dist');

module.exports = function rcWebpackConfig(data) {
  return webpackMerge(BaseWebpackConfig(data), {
    devtool: 'inline-cheap-module-source-map', // Allows us to read production code without uglification
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
              drop_console: false,
              warnings: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin('dist', {
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
