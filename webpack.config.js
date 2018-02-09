module.exports = function (env) { // Get env parameter from --env
  return require("./configs/webpack/webpack." + env + ".config.js")({env: env}) // Import selected configuration and leave env as a parameter to the imported configuration
};
