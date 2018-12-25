// Configs
const makeAppWebpackConfig = require('./configs/webpack/webpack.app.config.js');

module.exports = function initConfig(data) { // Get env parameter from --env
  return makeAppWebpackConfig({env: data.env}); // Import selected configuration and leave env as a parameter to the imported configuration
};
