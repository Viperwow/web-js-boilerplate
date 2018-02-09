// Vendors
const path = require("path");

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), "/../..");

module.exports = {
  "rootDir": ROOT_PATH,
  "bail": true,
  "verbose": true,
  "roots": [
    `${ROOT_PATH}/app/src`
  ],
  "setupTestFrameworkScriptFile": `${ROOT_PATH}/configs/jest/jest.config.setup.js`
};
