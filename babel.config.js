module.exports = {
  sourceType: 'unambiguous', // Is needed to omit module import/export consistency check to ignore some files while processing sources in the node_modules (see https://babeljs.io/docs/en/options#sourcetype for more)
  plugins: [
    ['babel-plugin-module-resolver', {
      root: [
        './', // Project root
      ],
      alias: {
        'react-dom': '@hot-loader/react-dom', // To make babel resolve this import correctly (for more info see webpack.base.config.js)
      },
    }],
    // Additional non-babel-preset-env
    '@babel/plugin-proposal-async-generator-functions', // Allow async/await in generators usage
    '@babel/plugin-transform-regenerator', // Allow generators usage
    '@babel/plugin-proposal-object-rest-spread', // Allow spread/rest operations
    // Stage 0
    '@babel/plugin-proposal-function-bind', // Allow :: operator to easy binding things
    // Stage 1
    '@babel/plugin-proposal-export-default-from', // To support symmetric import/export
    ['@babel/plugin-proposal-optional-chaining', { // Allow optional variable usage via ?. operator
      loose: false,
    }],
    ['@babel/plugin-proposal-pipeline-operator', { // Allow chaining using |> operator
      proposal: 'minimal',
    }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { // Allow to use ?? operator
      loose: false,
    }], // Better null & undefined checking (https://github.com/tc39/proposal-nullish-coalescing)
    // Stage 2
    ['@babel/plugin-proposal-decorators', { // To support old decorators syntax
      legacy: true,
    }],
    '@babel/plugin-proposal-export-namespace-from', // To support symmetric import/export
    // Stage 3
    '@babel/plugin-syntax-dynamic-import', // Allow parsing of import()
    ['@babel/plugin-proposal-class-properties', { // Allow class properties
      loose: false,
    }],
    '@babel/plugin-proposal-json-strings', // Allow special separators that JSON use, but ES not
    // Additional
    ['babel-plugin-transform-imports', { // To transform "import {a} from 'xxx'" into the "import a from 'xxx'"
      lodash: {
        transform: 'lodash/${member}', // eslint-disable-line no-template-curly-in-string
        preventFullImport: true,
      },
      'date-fns': {
        transform: 'date-fns/${member}', // eslint-disable-line no-template-curly-in-string
        preventFullImport: true,
      },
    }],
    'babel-plugin-graphql-tag', // Transform graphql-tag at the runtime and remove dependency from the output
    'babel-plugin-import-graphql', // To allow import separated .graphql and .gql files
    process.env.NODE_ENV !== 'test' // Add this plugin everywhere, but testing (tests is meant to test valid/invalid data input/output)
    && ['babel-plugin-flow-runtime', {
      assert: process.env.DEBUG_ENV,
      annotate: process.env.DEBUG_ENV,
    }],
    '@babel/plugin-transform-strict-mode', // To just enable strict mode in each file
  ].filter(Boolean),
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
        },
      },
    ],
    '@babel/preset-react',
    'linaria/babel',
    '@babel/preset-flow',
  ],
  env: {
    development: {
      plugins: [
        'react-hot-loader/babel',
      ],
    },
    test: {
      plugins: [
        'babel-plugin-dynamic-import-node', // Is needed to support dynamic imports in jest tests running by node (see https://github.com/airbnb/enzyme/issues/1460#issuecomment-388358778 for more info)
        'require-context-hook', // Is needed to allow require.context usage in tests out of the webpack's building scope (see https://github.com/storybooks/storybook/tree/master/addons/storyshots/storyshots-core for more info)
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: {
              version: 3,
            },
          },
        ],
        '@babel/preset-react',
        '@babel/preset-flow',
      ],
    },
  },
};
