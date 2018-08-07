// Vendors
const webpack = require('webpack');
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _without = require('lodash/without');

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const NODE_MODULES_PATH = path.join(ROOT_PATH, '/node_modules');
const APP_PATH = path.join(ROOT_PATH, '/app');
const SPECS_PATH = path.join(ROOT_PATH, '/specs');
const GEMINI_PATH = path.join(ROOT_PATH, '/gemini');

// Configs
const BROWSERSLIST_CONFIG = path.join(ROOT_PATH, '/.browserlistrc');
const POSTCSS_CONFIG = path.join(ROOT_PATH, '/configs/postcss.config.js');
const ESLINT_CONFIG = path.join(ROOT_PATH, '/.eslintrc.js');
const STYLELINT_CONFIG = path.join(ROOT_PATH, '/.stylelintrc.js');

// Package JSON
const packageJson = require(path.join(ROOT_PATH, '/package.json'));

module.exports = function (data) {
  const isRc = data.env === 'rc';
  const ENVIRONMENT = data.env === 'production' || isRc
    ? 'production'
    : 'development';
  const isDevMode = ENVIRONMENT === 'development';

  const DEPENDENCIES = Object.keys(packageJson.dependencies);

  const ORDERED_DEPENDENCIES = [
    'babel-polyfill', // Babel polyfill MUST be the first dependency to use polyfills
  ];

  const APP_DEPENDENCIES = [
    path.join(APP_PATH, '/src/index.jsx'), // Add our js entry point
    path.join(APP_PATH, '/assets/sass/index.sass'), // Add our sass/css entry point
  ];

  const VENDOR_DEPENDENCIES = [
    ...ORDERED_DEPENDENCIES,
    ..._without(DEPENDENCIES, ...ORDERED_DEPENDENCIES),
  ];

  return {
    mode: ENVIRONMENT,
    bail: true, // To stop building process on the first error
    node: {
      fs: 'empty', // To fix babel-plugin-react-css-modules's error of the unavailability of resolved 'fs' in target: "web" (webpack default) (see https://github.com/webpack-contrib/css-loader/issues/447 for more info)
    },
    entry: {
      app: APP_DEPENDENCIES,
      vendors: VENDOR_DEPENDENCIES,
    },
    output: {
      publicPath: '/', // Place from where everything would be served in webpack-dev-server
      filename: isDevMode
        ? '[name].js'
        : '[name].[chunkhash].js', // Output bundles would be named according to provided template
      chunkFilename: isDevMode
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
      extensions: [ '.js', '.jsx', '.css', '.scss', '.sass', '.md', '.json' ], // Allow files with following extensions being recognized without extension in import
    },
    module: {
      rules: [
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
                sourceMap: isDevMode || isRc, // Enable source maps for development and rc modes
                minimize: false, // Do not minimize css (because we already did it in postcss)
                importLoaders: 2, // Because we have 2 loaders applied before of css-loader
              },
            },
            {
              loader: 'postcss-loader',
              options: {
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
                limit: 10 * 1024, // 10kB
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
                limit: 10 * 1024, // 10kB
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
                limit: 10 * 1024, // 10kB
                name: '[name].[ext]?[hash]',
                outputPath: 'assets/fonts/',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      runtimeChunk: 'single', // Add only one 'runtime' file for all chunks
      splitChunks: {
        minChunks: 2, // More than 2 imports should be occurred
        minSize: 0, // Ignore default 30 Kb minimum requirement for file to be splitted
        chunks: 'all', // Use code splitting for both sync/async imports
        cacheGroups: {
          app: {
            name: 'app.common', // Name of the common parts being separated from 'app' entry (you might want to split common code by naming it like 'app.common', but if not - set its name as a name of corresponding entry point)
            priority: -20, // It means that all imports from main app will a part of the this chunk because the priority is lower then in vendor chunk
            reuseExistingChunk: true, // reuseExistingChunk tells SplitChunksPlugin to use existing chunk if available instead of creating new one
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors.common', // Name of the common parts being separated from 'vendors' entry (you might want to split common code by naming it like 'vendors.common', but if not - set its name as a name of corresponding entry point)
            priority: -10, // Enforce to add imported from node_modules modules to be a part of this chunk if they can be as well in another common chunk
          },
        },
      },
    },
    plugins: [
      new ExtractCssChunks({
        // Options similar to the same options in webpackOptions.output
        filename: isDevMode
          ? '[name].css'
          : '[name].[contenthash].css',
        chunkFilename: isDevMode
          ? '[id].css' // Id <=> name, because of optimize.namedChunks: true in 'development mode'
          : '[id].[name].[contenthash].css',
        hot: isDevMode, // Enable hot module replacement only in 'development'
      }),
      new StyleLintPlugin({
        configFile: STYLELINT_CONFIG,
        customSyntax: path.join(NODE_MODULES_PATH, '/postcss-sass'), // Enabling Sass parsing
      }),
      // It will exclude all locales from moment, but it will include [en-gb, ru]
      new webpack.ContextReplacementPlugin(
        /moment[\/\\]locale/,
        /(en-gb|ru)/
      ),
      new HtmlWebpackPlugin({
        title: 'Web boilerplate', // Page title
        template: path.join(APP_PATH, '/src/index.html'), // Path to the template that is being used as index html and with which one this plugin will do everything that it have to do
        chunksSortMode: 'dependency',
        minify: {
          collapseWhitespace: true, // Remove all whitespaces
          removeRedundantAttributes: true, // remove attributes that is not needed
          removeComments: true, // Remove comments from html
          minifyURLs: true, // Minify all urls
        },
      }),
      new webpack.EnvironmentPlugin({
        BABEL_ENV: ENVIRONMENT, // Set BABEL_ENV global variable with provided value
        NODE_ENV: ENVIRONMENT, // Set NODE_ENV global variable with provided value (by default NODE_ENV is based on BABEL_ENV, so we may not to provide it at all) (see https://babeljs.io/docs/usage/babelrc/#env-option for more info)
        BROWSERSLIST_CONFIG: BROWSERSLIST_CONFIG, // Browserlist config will be used directly by webpack (see https://github.com/ai/browserslist#config-file for more info)
      }),
      new CircularDependencyPlugin({ // Try to find circular dependencies at the build-time
        exclude: /a\.js|node_modules/, // Exclude node_modules
        failOnError: false // Show a warning when there is a circular dependency
      })
    ],
  };
};
