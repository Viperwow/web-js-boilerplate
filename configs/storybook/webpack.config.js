const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const webpackMerge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin'); // eslint-disable-line import/no-extraneous-dependencies
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const STORYBOOK_INDEX_PATH = path.join(ROOT_PATH, '/configs/storybook/config'); // Add our stories init entry point
const STYLES_INDEX_PATH = path.join(ROOT_PATH, '/assets/sass/index.sass'); // Add our sass/css entry point

module.exports = function makeStorybookWebpackConfig(baseConfig, env) {
  const ENVIRONMENT = env.toLowerCase();
  const {
    plugins,
    ...restCurrentProjectWebpackConfig
  } = require(`../webpack/webpack.${ENVIRONMENT}.config`)({ // eslint-disable-line import/no-dynamic-require, global-require
    env: ENVIRONMENT,
  });

  const filteredCurrentProjectWebpackConfig = {
    ...restCurrentProjectWebpackConfig,
    plugins: plugins.filter( // Ignore default plugins to prevent plugins duplication
      plugin => !(plugin instanceof CleanWebpackPlugin),
    ),
  };

  return webpackMerge(filteredCurrentProjectWebpackConfig, {
    entry: {
      app: [
        STORYBOOK_INDEX_PATH,
        STYLES_INDEX_PATH,
        'webpack-hot-middleware/client.js?reload=true',
      ],
    },
    module: {
      rules: [
        {
          test: /\.stories\.js(x)?(.flow)?$/,
          loaders: [
            {
              loader: require.resolve('@storybook/addon-storysource/loader'),
            },
          ],
        },
      ],
    },
    plugins: baseConfig.plugins.filter( // Ignore storybook default plugins to prevent plugins duplication
      plugin => !(plugin instanceof webpack.HotModuleReplacementPlugin)
        && !(plugin instanceof WatchMissingNodeModulesPlugin),
    ),
  });
};
