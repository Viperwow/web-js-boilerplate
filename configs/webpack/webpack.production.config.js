// Vendors
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;

// Configs
const BaseWebpackConfig = require('./webpack.base.config');

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const DIST = path.join(ROOT_PATH, '/dist');

module.exports = function productionWebpackConfig(data) {
  return webpackMerge(BaseWebpackConfig(data), {
    output: {
      path: DIST,
    },
    optimization: {
      minimizer: [
        new UglifyJsWebpackPlugin({
          cache: true,
          parallel: true, // Uses all cores available on given machine
          uglifyOptions: {
            compress: {
              drop_console: true,
              warnings: false,
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
