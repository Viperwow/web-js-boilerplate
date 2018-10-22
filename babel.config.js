module.exports = {
  plugins: [
    ['module-resolver', {
      root: [
        './', // Project root
        './specs', // Specs root
        './gemini', // Gemini root
      ],
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
    '@babel/plugin-syntax-import-meta', // Allow to get more info about import via global var import
    ['@babel/plugin-proposal-class-properties', { // Allow class properties
      loose: false,
    }],
    '@babel/plugin-proposal-json-strings', // Allow special separators that JSON use, but ES not
    // Additional
    ['transform-imports', { // To transform "import {a} from 'xxx'" into the "import a from 'xxx'"
      lodash: {
        transform: 'lodash/${member}', // eslint-disable-line no-template-curly-in-string
        preventFullImport: true,
      },
      'date-fns': {
        transform: 'date-fns/${member}', // eslint-disable-line no-template-curly-in-string
        preventFullImport: true,
      },
    }],
    'graphql-tag', // Transform graphql-tag at the runtime and remove depencency from the output
    'import-graphql', // To allow import separated .graphql and .gql files
    '@babel/plugin-transform-strict-mode', // To just enable strict mode in each file
  ],
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ],
  env: {
    development: {
      plugins: [
        'react-hot-loader/babel',
      ],
    },
    test: {
      presets: [
        [
          '@babel/env',
          {
            useBuiltIns: 'usage',
          },
        ],
        '@babel/preset-react',
      ],
    },
  },
};
