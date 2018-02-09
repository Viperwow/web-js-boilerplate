// Vendors
const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), "/../..");
const NODE_MODULES_PATH = path.join(ROOT_PATH, "/node_modules");
const APP_PATH = path.join(ROOT_PATH, '/app');

// Configs
const BROWSERSLIST_CONFIG = path.join(ROOT_PATH, '/.browserlistrc');
const POSTCSS_CONFIG = path.join(ROOT_PATH, '/configs/postcss.config.js');
const ESLINT_CONFIG = path.join(ROOT_PATH, '/.eslintrc.js');
const STYLELINT_CONFIG = path.join(ROOT_PATH, '/.stylelintrc.js');

// Package JSON
const packageJson = require(path.join(ROOT_PATH, '/package.json'));

module.exports = function (data) {
  const ENVIRONMENT = data.env === 'production' || data.env === 'rc' ? 'production' : 'development';

  const APP_DEPENDENCIES = [
    "babel-polyfill", // Babel polyfill MUST be the first dependency to be applied first
    'react-hot-loader/patch', //activate HMR for React
    path.join(APP_PATH, '/src/index.jsx'), // Add our js entry point
    path.join(APP_PATH, '/assets/sass/app.sass') // Add our sass/css entry point
  ]
    .filter(dependency => ENVIRONMENT === 'development' || dependency !== 'react-hot-loader/patch'); // In production we should exclude react-hot-loader

  const VENDOR_DEPENDENCIES = [...Object.keys(packageJson.dependencies)
    .filter(dependency => // In production we should exclude react-hot-loader and we should exclude babel-polyfill from vendors because it is listed in dependencies list, but already included in the app
      ENVIRONMENT === 'production' ? !['react-hot-loader', 'babel-polyfill'].includes(dependency) : !['babel-polyfill'].includes(dependency)
    )];

  return {
    bail: true, // To stop building process on the first error
    node: {
      fs: 'empty' // To fix babel-plugin-react-css-modules's error of the unavailability of resolved 'fs' in target: "web" (webpack default) (see https://github.com/webpack-contrib/css-loader/issues/447 for more info)
    },
    entry: {
      app: APP_DEPENDENCIES,
      vendor: VENDOR_DEPENDENCIES
    },
    output: {
      filename: "[name].[chunkhash].js", // Output bundles would be named according to provided template
      publicPath: "/" // Place from where everything would be served in webpack-dev-server
    },
    resolve: {
      modules: [ // So there are an array of paths where to look for modules based on publicPath
        "node_modules",
        'app',
        'app/src'
      ],
      extensions: [".js", ".jsx", ".css", '.sass', '.md', '.json'] // Allow files with following extensions being recognized without extension in import
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: NODE_MODULES_PATH,
          use: [
            "babel-loader", // Do babel transform
            {
              loader: 'eslint-loader', // Do eslint before any transformations
              options: {
                configFile: ESLINT_CONFIG // Get config from there
              }
            }
          ]
        },
        {
          test: /\.worker\.js$/,
          exclude: NODE_MODULES_PATH,
          use: ["worker-loader"]
        },
        {
          test: /\.(css|sass)$/,
          use: ExtractTextPlugin.extract({
            fallback: {
              loader: 'style-loader',
              options: {
                hmr: ENVIRONMENT === 'development' // Enable hot module replacement only in 'development'
              }
            },
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: false, // Do not minimize css (because we already did it in postcss
                  importLoaders: 2, // Because we have 2 loaders behind of css-loader
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: POSTCSS_CONFIG,
                  }
                }
              },
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024, // 10kB
                name: '[name].[ext]?[hash]',
                outputPath: 'assets/img/'
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10 * 1024, // 10kB
                iesafe: true // To support IE's 4kB limit
              }
            }
          ]
        },
        {
          test: /\.woff2?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024, // 10kB
                name: '[name].[ext]?[hash]',
                outputPath: 'assets/fonts/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new StyleLintPlugin({
        configFile: STYLELINT_CONFIG,
        customSyntax: path.join(NODE_MODULES_PATH, "/postcss-sass"), // Enabling Sass parsing
      }),
      // It will exclude all locales from moment, but it will include [en-gb, ru]
      new webpack.ContextReplacementPlugin(
        /moment[\\/\\]locale/,
        /(en-gb|ru)/
      ),
      new HtmlWebpackPlugin({
        title: "VALO Cloud messaging", // Page title
        template: path.join(APP_PATH, '/src/index.html'), // Path to the template that is being used as index html and with which one this plugin will do everything that it have to do
        chunksSort: "dependency",
        minify: {
          collapseWhitespace: true, // Remove all whitespaces
          removeRedundantAttributes: true, // remove attributes that is not needed
          removeComments: true, // Remove comments from html
          minifyURLs: true // Minify all urls
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({ // see https://webpack.js.org/plugins/commons-chunk-plugin/ for more info
        name: 'vendor', // Will use entry with name 'vendor' to find common parts
        filename: 'vendor.[chunkhash].js', // Name of the common parts being separated from 'vendor' entry
        minChunks: Infinity // Include everything that is seems common
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest', // Will use entry with name 'manifest' to find common parts (manifest is a file with metadata)
        filename: 'manifest.[hash].js', // Name of the common parts being separated from 'manifest' entry
        minChunks: Infinity // Include everything that is seems common
      }),
      new webpack.EnvironmentPlugin({
        BABEL_ENV: ENVIRONMENT, // Set BABEL_ENV global variable with provided value
        NODE_ENV: ENVIRONMENT, // Set NODE_ENV global variable with provided value (by default NODE_ENV is based on BABEL_ENV, so we may not to provide it at all) (see https://babeljs.io/docs/usage/babelrc/#env-option for more info)
        BROWSERSLIST_CONFIG: BROWSERSLIST_CONFIG // Browserlist config will be used directly by webpack (see https://github.com/ai/browserslist#config-file for more info)
      })
    ]
  };
};
