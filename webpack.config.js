module.exports = function initConfig(data) { // Get env parameter from --env
  // eslint-disable-next-line global-require, import/no-dynamic-require
  return require(`./configs/webpack/webpack.${data.env}.config.js`)({env: data.env}); // Import selected configuration and leave env as a parameter to the imported configuration
};
