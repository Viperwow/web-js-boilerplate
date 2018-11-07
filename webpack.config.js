module.exports = function (data) { // Get env parameter from --env
  return require("./configs/webpack/webpack." + data.env + ".config.js")({env: data.env}) // Import selected configuration and leave env as a parameter to the imported configuration
};
