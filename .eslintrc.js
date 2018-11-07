module.exports = {
  'extends': [
    'airbnb',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:lodash/canonical',
    'plugin:you-dont-need-lodash-underscore/all',
    'plugin:compat/recommended',
  ],
  'plugins': [
    'jest',
    'promise',
    'unicorn',
    'jsdoc',
    'lodash',
    'compat',
    'sort-class-members',
  ],
  'parser': 'babel-eslint',
  'env': { // You might have seen, that there is no 'es6: true' and etc. This is because it's inherited from plugins configurations
    'worker': true,
  },
  'globals': {
    'gemini': true, // Allow gemini to be used globally (WARNING maybe it's a mistake, because it's defined in the package.json as a devDependency, but mustn't be a dependency as eslint tells us)
  },
  'settings': {
    'import/resolver': {
      'babel-module': {
        'root': [ // Same as in babel.config.js, but for ESLint
          './', // Project root
          './specs', // Specs root
          './gemini', // Gemini root
        ],
      },
      'extensions': [ // Available extensions to be resolved via babel-module
        '.js',
        '.jsx',
        '.mjs',
      ],
    },
    'polyfills': [ // Add babel polyfills here that is compatible with browsers from the .browserslistrc (see more at https://github.com/amilajack/eslint-plugin-compat/wiki/Adding-polyfills)
      'promises',
    ],
  },
  'rules': {
    // Airbnb / eslint
    'no-confusing-arrow': [0], // Allow using arrow functions with conditional return for a single parameter
    'no-underscore-dangle': [0], // Allow names with underscores and their usage
    'arrow-parens': [2, 'as-needed'], // Ignore single parameter functions on arrow function definition
    'react/prefer-stateless-function': [0], // Allow React component to be a class and not to be a pure functions strictly
    'react/sort-comp': [0], // Everything has been controlled by custom rules already
    'jsx-a11y/anchor-is-valid': [2, { // Check for valid react-router <Link />
      'components': ['Link'],
      'specialLink': ['to'],
      'aspects': ['noHref', 'invalidHref', 'preferButton'],
    }],
    'react/jsx-curly-spacing': [2, 'never'], // Enforce the usage of the no spaces between curly brackets
    'react/prop-types': [1], // FIXME Set this field to '0' when Flow will be in
    'object-curly-spacing': [2, 'never'], // Overwrite airbnb defaults to use no spaces between curly brackets
    'max-len': [2, { // Overwrite airbnb defaults to use 2-spaced indents and 100 line length
      'code': 100,
      'tabWidth': 2,
      'ignoreTrailingComments': true, // Allow non-fixed comments on the same line as
    }],
    // Unicorn
    'unicorn/filename-case': [0], // Remove necessity of the file special filename casing, because we need to use kebabCase for the most of the files, but for classes and react components we should prefer PascalCasing
    'unicorn/no-process-exit': [0], // Ignore rule for Node.js
    'unicorn/no-new-buffer': [0], // Ignore rule for Node.js
    'unicorn/custom-error-definition': [2], // Force the only correct subclassing of the Error object
    // JSDoc
    'jsdoc/check-param-names': [2],
    'jsdoc/check-tag-names': [2],
    'jsdoc/check-types': [2],
    'jsdoc/newline-after-description': [2],
    'jsdoc/no-undefined-types': [2], // FIXME Set this field to '0' when Flow will be in
    'jsdoc/require-description-complete-sentence': [2],
    'jsdoc/require-example': [2],
    'jsdoc/require-hyphen-before-param-description': [2],
    'jsdoc/require-param': [2],
    'jsdoc/require-param-description': [2],
    'jsdoc/require-param-name': [2],
    'jsdoc/require-param-type': [2], // FIXME Set this field to '0' when Flow will be in
    'jsdoc/require-returns-description': [2],
    'jsdoc/require-returns-type': [2], // FIXME Set this field to '0' when Flow will be in
    'jsdoc/valid-types': [2],
    // Promise
    'promise/catch-or-return': [0], // Allow omitting of the catch definition
    'promise/no-nesting': [2], // No nested promises, just chains
    'promise/no-promise-in-callback': [0], // Ignore rule for Node.js
    'promise/no-callback-in-promise': [0], // Ignore rule for Node.js
    'promise/avoid-new': [0], // Force the usage of the new while dealing with the Promise (e.g. new Promise(resolve, reject), not Promise.resolve())
    'promise/no-return-in-finally': [2], // Avoid returning any values in finally
    'promise/valid-params': [2], // Always valid number of arguments should be provided to the promise's functions
    // Lodash
    'lodash/import-scope': [2, 'member'], // To ease the use of the lodash in code (do not mind about optimization, because webpack plugin will take all the tree-shaking job)
    'lodash/prefer-reject': [0], // Its much more readable instead of additional wrapping
    'lodash/prefer-matches': [0], // Its much more readable instead of additional wrapping
    'lodash/prefer-over-quantifier': [0], // Its much more readable instead of additional wrapping
    'lodash/prefer-lodash-method': [2, { // Whitelist all of the native functions, but force to use lodash for the rest of the cases
      'ignoreMethods': [ // We donn't care for these methods about how the user write code using lodash or not
        'concat', 'fill', '(last)?IndexOf', 'join', 'reverse', 'slice',
        'find(Index)?', 'each', 'forEach', 'every', 'filter', 'includes', 'map', 'reduce(Right)?', 'some', 'partial',
        'assign', 'keys', 'values', 'repeat', 'template', 'to(Lower|Upper|Pairs)', 'trim', 'replace', 'is(Array|NaN)',
        'slice', 'splice', 'entries',
      ],
    }],
    // Ignore native realization for methods from the list below, but prefer native for everything else from the list (www.npmjs.com/package/eslint-plugin-you-dont-need-lodash-underscore)
    'you-dont-need-lodash-underscore/compact': [0], // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/flatten': [0], // We don't want to write massive equivalent, so, lodash here is an order of magnitude better than native one
    'you-dont-need-lodash-underscore/flatten-deep': [0], // We don't want to write massive equivalent, so, lodash here is an order of magnitude better than native one
    'you-dont-need-lodash-underscore/from-pairs': [0], // We don't want to write massive equivalent, so, lodash here is an order of magnitude better than native one
    'you-dont-need-lodash-underscore/without': [0], // We don't want to write massive equivalent, so, lodash here is an order of magnitude better than native one
    'you-dont-need-lodash-underscore/group-by': [0], // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/min-by': [0], // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/max-by': [0], // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/range': [0], // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/size': [0], // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/uniq': [0], // We don't want unreadable and not self-descriptive code
    // Jest
    'jest/no-disabled-tests': [0], // Force the usage of all tests that have been written (it force you to remove old/unnecessary tests)
    // Class member sorting
    'sort-class-members/sort-class-members': [2, {
      'groups': {
        'callbacks': [{
          'name': '/on.+/',
          'type': 'method',
        }], // Add custom sorting group for public callbacks
        'private-callbacks': [{
          'name': '/_on.+/',
          'type': 'method',
        }], // Add custom sorting group for private callbacks
        'react-lifecycle-class-data': [
          'displayName',
          'propTypes',
          'contextTypes',
          'childContextTypes',
        ],
        'react-lifecycle-properties': [
          'defaultProps',
          'state',
          {'name': '/_mixin.+/'},
        ],
        'react-lifecycle-methods': [
          'getDefaultProps',
          'getInitialState',
          'getChildContext',
          'getDerivedStateFromProps',
          'componentWillMount',
          'UNSAFE_componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'UNSAFE_componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'UNSAFE_componentWillUpdate',
          'getSnapshotBeforeUpdate',
          'componentDidUpdate',
          'componentDidCatch',
          'componentWillUnmount',
          'render',
        ],
      },
      'order': [
        '[react-lifecycle-class-data]',
        '[arrow-function-properties]',
        '[static-properties]',
        '[react-lifecycle-properties]',
        '[properties]',
        '[conventional-private-properties]',
        'constructor',
        '[getters]',
        '[setters]',
        '[static-methods]',
        '[callbacks]',
        '[methods]',
        '[react-lifecycle-methods]',
        '[private-callbacks]',
        '[conventional-private-methods]',
      ],
      'accessorPairPositioning': 'getThenSet',
    }],
  },
};
