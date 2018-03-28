// Vendors
const path = require("path");

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), "/../..");
const SRC_PATH = path.join(ROOT_PATH, '/app/src');
const SPECS_PATH = path.join(ROOT_PATH, '/specs');
//const SUPPORT_PATH = path.join(SPECS_PATH, '/support');

module.exports = {
  "rootDir": ROOT_PATH,
  "bail": true,
  "verbose": true,
  "roots": [
    SRC_PATH,
    SPECS_PATH
  ],
  "testMatch": [
    "**/*.steps.js?(x)",
    "**/*.test.js?(x)",
    "**/*.support.js?(x)"
  ],
  //setupFiles: [`${SUPPORT_PATH}`],
  "setupTestFrameworkScriptFile": `${ROOT_PATH}/configs/jest/jest.config.setup.js`
};
