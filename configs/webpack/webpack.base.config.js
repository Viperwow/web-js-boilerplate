const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const CircularDependencyPlugin = require('circular-dependency-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const StyleLintPlugin = require('stylelint-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const packageJson = require('../../package.json');

const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const NODE_MODULES_PATH = path.join(ROOT_PATH, '/node_modules');
const FLOW_TYPED_PATH = path.join(ROOT_PATH, '/flow-typed');
const POSTCSS_SASS_PARSER_PATH = path.join(NODE_MODULES_PATH, '/postcss-sass');
const DEV_DEPENDENCIES_PATHS = Object.keys(packageJson.devDependencies)
  .map(dependencyName => path.join(NODE_MODULES_PATH, `/${dependencyName}`));
const COMMON_EXCLUSION_PATHS = [
  FLOW_TYPED_PATH,
  /core-js\b/,
  /@babel\b/,
  ...DEV_DEPENDENCIES_PATHS,
];

const BROWSERSLIST_CONFIG = path.join(ROOT_PATH, '/.browserslistrc');
const POSTCSS_CONFIG = path.join(ROOT_PATH, '/configs/postcss.config.js');
const ESLINT_CONFIG = path.join(ROOT_PATH, '/.eslintrc.js');
const STYLELINT_CONFIG = path.join(ROOT_PATH, '/.stylelintrc.js');

const IMG_SIZE_LIMIT = 10 * 1024; // 10kB
const FONTS_SIZE_LIMIT = 10 * 1024; // 10kB

module.exports = function makeBaseWebpackConfig(data) {
  const IS_RC = data.env === 'rc';
  const ENVIRONMENT = data.env === 'production' || IS_RC
    ? 'production'
    : 'development';
  const IS_DEVELOPMENT_MODE = ENVIRONMENT === 'development';
  const IS_DEBUG_MODE = IS_DEVELOPMENT_MODE || IS_RC; // Enable source maps and another debug info for development and rc modes
  const ORDERED_DEPENDENCIES = [
    '@ungap/global-this', // To support single global 'this' between workers, browser and node environments (read more at https://mathiasbynens.be/notes/globalthis)
    'unfetch/polyfill', // To support Fetch API in older browsers, because @babel/polyfill doesn't provide such a polyfill (differences with official documentation related to the https://github.com/developit/unfetch/issues/93)
    'formdata-polyfill', // Add FormData polyfill (read more at https://www.npmjs.com/package/formdata-polyfill)
    'react-hot-loader/patch', // This is the requirement from https://github.com/gaearon/react-hot-loader
  ];
  const DEPENDENCIES = [
    ...ORDERED_DEPENDENCIES,
    'normalize.css',
  ];

  return {
    mode: ENVIRONMENT,
    bail: true, // To stop building process on the first error
    node: {
      fs: 'empty', // To fix babel-plugin-react-css-modules's error of the unavailability of resolved 'fs' in target: "web" (webpack default) (see https://github.com/webpack-contrib/css-loader/issues/447 for more info)
    },
    entry: {
      app: DEPENDENCIES,
    },
    output: {
      publicPath: '/', // Place from where everything would be served in webpack-dev-server
      filename: IS_DEVELOPMENT_MODE
        ? '[name].js'
        : '[name].[chunkhash].js', // Output bundles would be named according to provided template
      chunkFilename: IS_DEVELOPMENT_MODE
        ? '[id].js' // Id <=> name, because of optimize.namedChunks: true in 'development mode'
        : '[id].[name].[contenthash].js',
      globalObject: '(typeof self === undefined ? this : self)', // WARNING: dirty hack to make it works, because webpack 4 is unable to deal with workers in web related environments (see https://github.com/webpack/webpack/issues/6642 for more info)
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom', // It is needed to use react-dom with the same naming, because @hot-loader/react-dom is a react-dom package, but with react-hot-loading support
      },
      modules: [ // So there are an array of paths where to look for modules based on publicPath (by the way, keep in mind, that this paths affects every file extension, so babel module resolver's paths complement it for JS)
        'node_modules', // Vendor modules root to import from (default, but it should be explicitly defined if there are anything else defined)
        ROOT_PATH, // App modules root to import from
      ],
      extensions: ['.js', '.jsx', '.mjs', '.js.flow'], // Allow files with following extensions being recognized without extension in import
    },
    module: {
      rules: [
        {
          enforce: 'pre', // Allow to do linting before other loaders will start (this loader would be called on "pitching" phase, for more info see https://webpack.js.org/api/loaders/#pitching-loader)
          test: /.js(x)?(.flow)?$/, // Allow to look for js/jsx, but not for the workers (Help to expel the problem with workers taken for standard js files)
          exclude: COMMON_EXCLUSION_PATHS,
          use: [
            {
              loader: 'eslint-loader', // Do eslint before any transformations
              options: {
                cache: true,
                configFile: ESLINT_CONFIG, // Get config from there
              },
            },
          ],
        },
        { // To support apollo graphql .mjs imports for webpack 4.x.x
          test: /\.mjs$/,
          exclude: COMMON_EXCLUSION_PATHS,
          type: 'javascript/auto',
          use: [
            {
              loader: 'babel-loader', // Do babel transform
              options: {
                cacheDirectory: true, // Cache transpilation results and reuse them to speed up build (see more at https://github.com/babel/babel-loader#options)
              },
            },
          ],
        },
        {
          test: /(?<!worker)\.js(x)?(.flow)?$/, // Allow to look for js/jsx, but not for the workers (Help to expel the problem with workers taken for standard js files)
          exclude: COMMON_EXCLUSION_PATHS,
          use: [
            {
              loader: 'babel-loader', // Do babel transform
              options: {
                cacheDirectory: true, // Cache transpilation results and reuse them to speed up build (see more at https://github.com/babel/babel-loader#options)
              },
            },
          ],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: COMMON_EXCLUSION_PATHS,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.worker\.js$/,
          exclude: COMMON_EXCLUSION_PATHS,
          use: [
            {
              loader: 'worker-loader',
              options: {
                name: IS_DEVELOPMENT_MODE
                  ? '[name].js'
                  : '[hash].worker.js',
              },
            },
            {
              loader: 'babel-loader', // To support polyfilling of workers
              options: {
                cacheDirectory: true, // Cache transpilation results and reuse them to speed up build (see more at https://github.com/babel/babel-loader#options)
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/, // WARNING: just keep in mind that normalize.css require to not exclude node_modules and not the only
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                hot: true, // if you want HMR
                reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2, // Because we have 2 loaders applied before of css-loader
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_DEBUG_MODE,
                config: {
                  path: POSTCSS_CONFIG,
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEBUG_MODE,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          exclude: COMMON_EXCLUSION_PATHS,
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
          exclude: COMMON_EXCLUSION_PATHS,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: IMG_SIZE_LIMIT,
                iesafe: true, // To support IE's 4kB limit
                outputPath: 'assets/img/',
              },
            },
          ],
        },
        {
          test: /\.woff2?$/,
          exclude: COMMON_EXCLUSION_PATHS,
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
        customSyntax: POSTCSS_SASS_PARSER_PATH, // Enabling Sass parsing
      }),
      new webpack.EnvironmentPlugin({
        BROWSERSLIST_CONFIG, // Browserslist config will be used directly by webpack (see https://github.com/ai/browserslist#config-file for more info)
      }),
      new CircularDependencyPlugin({ // Try to find circular dependencies at the build-time (it'd be used for dynamic import statements)
        exclude: /node_modules/, // Exclude node_modules (it doesn't support direct path, just RegExp)
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
      new webpack.ContextReplacementPlugin(
        /date-fns[/\\]/,
        new RegExp(`[/\\\\](${[
          'en',
          'ru',
        ].join('|')})[/\\\\]`),
      ),
    ],
  };
};
