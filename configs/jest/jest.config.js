// Vendors
const path = require('path');

// Path
const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const SRC_PATH = path.join(ROOT_PATH, '/src');
const SPECS_PATH = path.join(ROOT_PATH, '/specs');
// const SUPPORT_PATH = path.join(SPECS_PATH, '/support'); // FIXME Uncomment this line when you'll add any support files to the <rootDir>/specs/support

module.exports = {
  rootDir: ROOT_PATH,
  verbose: true,
  automock: true, // Mock every import in tests by default to speed up testing
  roots: [
    SRC_PATH,
    SPECS_PATH,
  ],
  testMatch: [
    '**/*.+(test|spec|steps|support).js?(x)',
  ],
  unmockedModulePathPatterns: [ // Unmock base things by default (you still have to unmock every import not described as pattern in this section or write your own mock in __mocks__ folder somewhere)
    'node_modules/parse5',
    'node_modules/core-js',
    'node_modules/enzyme',
    'node_modules/enzyme-adapter-react-16',
    'node_modules/enzyme-to-json',
    'node_modules/react',
    'node_modules/react-dom',
    'node_modules/classnames',
    'node_modules/lodash',
    'node_modules/graphql',
    'node_modules/apollo',
    'intellij',
  ],
  // setupFiles: [`${SUPPORT_PATH}`], // FIXME Uncomment this line when you'll add any support files to the <rootDir>/specs/support
  setupTestFrameworkScriptFile: `${ROOT_PATH}/configs/jest/jest.config.setup.js`,
  transform: { // It's added here to support additional preprocessors usage and to not forget about such a thing in future (see https://jestjs.io/docs/en/configuration.html#transform-object-string-string for more info) and it might fail on the flow usage without this block
    '^.+\\.jsx?$': 'babel-jest', // Transform JS code using babel
    '^.+\\.(gql|graphql)$': 'jest-transform-graphql', // To support graphql-tag usage in jest (see https://github.com/apollographql/graphql-tag#webpack-preprocessing-with-graphql-tagloader for more info)
  },
};
