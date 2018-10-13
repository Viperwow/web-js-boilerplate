// Vendors
const path = require("path");

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), "/../..");
const SRC_PATH = path.join(ROOT_PATH, '/app/src');
const SPECS_PATH = path.join(ROOT_PATH, '/specs');
// const SUPPORT_PATH = path.join(SPECS_PATH, '/support'); // FIXME Uncomment this line when you'll add any support files to the <rootDir>/specs/support

module.exports = {
  "rootDir": ROOT_PATH,
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
  // setupFiles: [`${SUPPORT_PATH}`], // FIXME Uncomment this line when you'll add any support files to the <rootDir>/specs/support
  "setupTestFrameworkScriptFile": `${ROOT_PATH}/configs/jest/jest.config.setup.js`,
  "transform": { // It's added here to support additional preprocessors usage and to not forget about such a thing in future (see https://jestjs.io/docs/en/configuration.html#transform-object-string-string for more info) and it might fail on the flow usage without this block
    "^.+\\.jsx?$": "babel-jest"
  },
};
