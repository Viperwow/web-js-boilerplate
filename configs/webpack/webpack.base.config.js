// Vendors
const webpack = require('webpack');
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const NODE_MODULES_PATH = path.join(ROOT_PATH, '/node_modules');
const APP_PATH = path.join(ROOT_PATH, '/app');
const SPECS_PATH = path.join(ROOT_PATH, '/specs');
const GEMINI_PATH = path.join(ROOT_PATH, '/gemini');

// Configs
const BROWSERSLIST_CONFIG = path.join(ROOT_PATH, '/.browserslistrc');
const POSTCSS_CONFIG = path.join(ROOT_PATH, '/configs/postcss.config.js');
const ESLINT_CONFIG = path.join(ROOT_PATH, '/.eslintrc.js');
const STYLELINT_CONFIG = path.join(ROOT_PATH, '/.stylelintrc.js');

// Constants
const IMG_SIZE_LIMIT = 10 * 1024; // 10kB
const FONTS_SIZE_LIMIT = 10 * 1024; // 10kB

module.exports = function (data) {
  const IS_RC = data.env === 'rc';
  const ENVIRONMENT = data.env === 'production' || IS_RC
    ? 'production'
    : 'development';
  const IS_DEVELOPMENT_MODE = ENVIRONMENT === 'development';
  const IS_SOURCE_MAP = IS_DEVELOPMENT_MODE || IS_RC; // Enable source maps for development and rc modes

  const APP_DEPENDENCIES = [
    path.join(APP_PATH, '/src/index.jsx'), // Add our js entry point
    path.join(APP_PATH, '/assets/sass/index.sass'), // Add our sass/css entry point
    'normalize.css'
  ];

  return {
    mode: ENVIRONMENT,
    bail: true, // To stop building process on the first error
    node: {
      fs: 'empty', // To fix babel-plugin-react-css-modules's error of the unavailability of resolved 'fs' in target: "web" (webpack default) (see https://github.com/webpack-contrib/css-loader/issues/447 for more info)
    },
    entry: {
      app: APP_DEPENDENCIES,
    },
    output: {
      publicPath: '/', // Place from where everything would be served in webpack-dev-server
      filename: IS_DEVELOPMENT_MODE
        ? '[name].js'
        : '[name].[chunkhash].js', // Output bundles would be named according to provided template
      chunkFilename: IS_DEVELOPMENT_MODE
        ? '[id].js' // Id <=> name, because of optimize.namedChunks: true in 'development mode'
        : '[id].[name].[contenthash].js',
    },
    resolve: {
      modules: [ // So there are an array of paths where to look for modules based on publicPath
        'node_modules', // Vendor modules root to import from (default, but it should be explicitly defined if there are anything else defined)
        APP_PATH, // App modules root to import from
        SPECS_PATH, // Tests import root (we need it, because sometimes we might want to use shared parts for tests (e.g. setups))
        GEMINI_PATH, // Gemini tests import root (we need it, because sometimes we might want to use shared parts for tests (e.g. gemini setups))
      ],
      extensions: [ '.js', '.jsx', '.mjs'], // Allow files with following extensions being recognized without extension in import
    },
    module: {
      rules: [
        { // To support apollo graphql .mjs imports for webpack 4.x.x
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
        {
          test: /\.jsx?$/,
          exclude: NODE_MODULES_PATH,
          use: [
            'babel-loader', // Do babel transform
            {
              loader: 'eslint-loader', // Do eslint before any transformations
              options: {
                configFile: ESLINT_CONFIG, // Get config from there
              },
            },
          ],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        },
        {
          test: /\.worker\.js$/,
          exclude: NODE_MODULES_PATH,
          use: [
            'worker-loader',
            'babel-loader', // To support polyfilling of workers
            {
              loader: 'eslint-loader', // Do eslint before any transformations
              options: {
                configFile: ESLINT_CONFIG, // Get config from there
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            ExtractCssChunks.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_SOURCE_MAP,
                minimize: false, // Do not minimize css (because we already did it in postcss)
                importLoaders: 2, // Because we have 2 loaders applied before of css-loader
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_SOURCE_MAP,
                config: {
                  path: POSTCSS_CONFIG,
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: IMG_SIZE_LIMIT,
                name: '[name].[ext]?[hash]',
                outputPath: 'assets/img/',
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: IMG_SIZE_LIMIT,
                iesafe: true, // To support IE's 4kB limit
              },
            },
          ],
        },
        {
          test: /\.woff2?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: FONTS_SIZE_LIMIT,
                name: '[name].[ext]?[hash]',
                outputPath: 'assets/fonts/',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      sideEffects: false,
      runtimeChunk: 'single', // Add only one 'runtime' file for all chunks
      splitChunks: {
        minSize: 0, // Ignore default 30 Kb minimum requirement for file to be splitted
        chunks: 'all', // Use code splitting for both sync/async imports
        cacheGroups: {
          common: {
            name: 'common',
            priority: -20,
            reuseExistingChunk: true,
            minChunks: 2, // More than 2 imports should be occurred
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors', // Name of the common parts being separated from 'vendors' entry (you might want to split common code by naming it like 'vendors.common', but if not - set its name as a name of corresponding entry point)
            priority: -10,
          },
        },
      },
    },
    plugins: [
      new ExtractCssChunks({
        // Options similar to the same options in webpackOptions.output
        filename: IS_DEVELOPMENT_MODE
          ? '[name].css'
          : '[name].[contenthash].css',
        chunkFilename: IS_DEVELOPMENT_MODE
          ? '[id].css' // Id <=> name, because of optimize.namedChunks: true in 'development mode'
          : '[id].[name].[contenthash].css',
        hot: IS_DEVELOPMENT_MODE, // Enable hot module replacement only in 'development'
      }),
      new StyleLintPlugin({
        configFile: STYLELINT_CONFIG,
        customSyntax: path.join(NODE_MODULES_PATH, '/postcss-sass'), // Enabling Sass parsing
      }),
      new HtmlWebpackPlugin({
        title: 'Web boilerplate', // Page title
        template: path.join(APP_PATH, '/src/index.html'), // Path to the template that is being used as index html and with which one this plugin will do everything that it have to do
        chunksSortMode: 'dependency',
        minify: {
          collapseWhitespace: true, // Remove all whitespaces
          removeRedundantAttributes: true, // remove attributes that is not needed
          removeComments: true, // Remove comments from html
          minifyURLs: true, // Minify all urls
          sortAttributes: true,
          sortClassName: true,
        },
      }),
      new webpack.EnvironmentPlugin({
        BABEL_ENV: ENVIRONMENT, // Set BABEL_ENV global variable with provided value
        NODE_ENV: ENVIRONMENT, // Set NODE_ENV global variable with provided value (by default NODE_ENV is based on BABEL_ENV, so we may not to provide it at all) (see https://babeljs.io/docs/usage/babelrc/#env-option for more info)
        BROWSERSLIST_CONFIG: BROWSERSLIST_CONFIG, // Browserslist config will be used directly by webpack (see https://github.com/ai/browserslist#config-file for more info)
      }),
      new CircularDependencyPlugin({ // Try to find circular dependencies at the build-time
        exclude: /a\.js|node_modules/, // Exclude node_modules
        failOnError: true, // Show a warning when there is a circular dependency
        allowAsyncCycles: false, // Disallow import cycles that include an async import, e.g. via import(/* webpackMode: "weak" */ './file.js')
      }),
      new LodashModuleReplacementPlugin({ // Shrink down all unnecessary lodash helpers and functionality, except whitelisted below (see mapping https://github.com/lodash/lodash-webpack-plugin/blob/master/src/mapping.js to find out more info about each option)
        shorthands: true,
        caching: true,
        exotics: true,
        guards: true,
        memoizing: true,
        flattening: true,
        paths: true,
      }),
    ],
  };
};
