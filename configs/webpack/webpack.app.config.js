const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const webpackMerge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const makeBaseWebpackConfig = require('./webpack.base.config');
const makeDevelopmentWebpackConfig = require('./webpack.development.config');
const makeProductionWebpackConfig = require('./webpack.production.config');
const makeRcWebpackConfig = require('./webpack.rc.config');

const {PROJECT_DIST_NAME} = require('./constants');

const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const HTML_INDEX_PATH = path.join(ROOT_PATH, '/src/index.html'); // Path to the template that is being used as index html and with which one this plugin will do everything that it have to do
const JS_INDEX_PATH = path.join(ROOT_PATH, '/src/index.jsx'); // Add our js entry point
const STYLES_INDEX_PATH = path.join(ROOT_PATH, '/assets/sass/index.sass'); // Add our sass/css entry point
const DIST = path.join(ROOT_PATH, `/${PROJECT_DIST_NAME}`);

module.exports = function makeAppWebpackConfig(data) {
  let currentWebpackConfig;

  switch (data.env) {
    case 'development':
      currentWebpackConfig = makeDevelopmentWebpackConfig(data);
      break;
    case 'rc':
      currentWebpackConfig = makeRcWebpackConfig(data);
      break;
    case 'production':
      currentWebpackConfig = makeProductionWebpackConfig(data);
      break;
    default:
      currentWebpackConfig = makeBaseWebpackConfig(data);
      break;
  }

  const output = ['production', 'rc'].includes(data.env)
    ? {
      output: {
        path: DIST,
      },
    }
    : {};

  return webpackMerge(currentWebpackConfig, {
    ...output,
    entry: {
      app: [
        JS_INDEX_PATH,
        STYLES_INDEX_PATH,
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Web-js-boilerplate', // Page title
        template: HTML_INDEX_PATH,
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
    ].filter(Boolean),
  });
};
