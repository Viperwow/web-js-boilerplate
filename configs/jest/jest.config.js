const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies

const ROOT_PATH = path.join(path.resolve(__dirname), '/../..');
const SRC_PATH = path.join(ROOT_PATH, '/src');
const SPECS_PATH = path.join(ROOT_PATH, '/specs');

const UNMOCKED_SYSTEM_DEPENDENCIES = [
  'intellij',
];

const UNMOCKED_POLYFILLS = [
  'node_modules/parse5',
  'node_modules/core-js',
  'node_modules/global',
  'node_modules/babel-plugin-require-context-hook/register',
];

const UNMOCKED_ENZYME_DEPENDENCIES = [
  'node_modules/enzyme',
  'node_modules/enzyme-adapter-react-16',
  'node_modules/enzyme-to-json',
];

const UNMOCKED_REACT_DEPENDENCIES = [
  'node_modules/react',
  'node_modules/react-dom',
];

const UNMOCKED_GRAPHQL_DEPENDENCIES = [
  'node_modules/graphql',
  'node_modules/apollo',
];

const UNMOCKED_VARIOUS_DEPENDENCIES = [
  'node_modules/classnames',
  'node_modules/lodash',
  'node_modules/i18next',
];

const UNMOCKED_STORYBOOK_DEPENDENCIES = [
  'node_modules/@storybook/addon-actions',
  'node_modules/@storybook/addon-info',
  'node_modules/@storybook/addon-jest',
  'node_modules/@storybook/addon-knobs',
  'node_modules/@storybook/addon-options',
  'node_modules/@storybook/addon-storysource',
  'node_modules/@storybook/addon-viewport',
  'node_modules/@storybook/react',
];

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
  moduleNameMapper: {
    '^react-dom(.*)': '@hot-loader/react-dom/$1',
    '\\.svg': '<rootDir>/__mocks__/svgrMock.jsx',
  },
  unmockedModulePathPatterns: [ // Unmock base things by default (you still have to unmock every import not described as pattern in this section or write your own mock in __mocks__ folder somewhere)
    ...UNMOCKED_SYSTEM_DEPENDENCIES,
    ...UNMOCKED_POLYFILLS,
    ...UNMOCKED_ENZYME_DEPENDENCIES,
    ...UNMOCKED_REACT_DEPENDENCIES,
    ...UNMOCKED_GRAPHQL_DEPENDENCIES,
    ...UNMOCKED_VARIOUS_DEPENDENCIES,
    ...UNMOCKED_STORYBOOK_DEPENDENCIES,
  ],
  setupFilesAfterEnv: [`${ROOT_PATH}/configs/jest/jest.config.setup.js`],
  transform: { // It's added here to support additional preprocessors usage and to not forget about such a thing in future (see https://jestjs.io/docs/en/configuration.html#transform-object-string-string for more info) and it might fail on the flow usage without this block
    '^.+\\.jsx?$': 'babel-jest', // Transform JS code using babel
    '^.+\\.(gql|graphql)$': 'jest-transform-graphql', // To support graphql-tag usage in jest (see https://github.com/apollographql/graphql-tag#webpack-preprocessing-with-graphql-tagloader for more info)
  },
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 15,
      lines: 30,
      statements: 30,
    },
  },
};
