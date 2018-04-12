// Vendors
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Configs
const BaseWebpackConfig = require('./webpack.base.config');

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const DIST = path.join(ROOT_PATH, '/dist');

module.exports = function productionWebpackConfig(data) {
  return webpackMerge(BaseWebpackConfig(data), {
    output: {
      path: DIST,
      filename: "[name].[chunkhash].js", // Output bundles would be named according to provided template
      chunkFilename: '[id].[chunkhash].js', // Output dynamic imported chunks would be named according to provided template ([id] is to hide internals of the app)
    },
    plugins: [
      // It will make a separated from js code css bundle and it is superior, because of css loading goes in parallel
      new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        allChunks: true
      }),
      new CleanWebpackPlugin('dist', {
        root: ROOT_PATH
      }),
      new UglifyjsWebpackPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
            warnings: false
          }
        }
      }),
      new ImageminWebpackPlugin({
        test: /\.(svg|png|gif|jpe?g)$/,
        svgo: {
          removeTitle: true,
          removeDesc: true
        },
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
    ],
  });
};
