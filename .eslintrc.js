module.exports = {
  'extends': [
    'airbnb',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:lodash/canonical',
    'plugin:you-dont-need-lodash-underscore/compatible',
  ],
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
    'worker': true,
  },
  'settings': {
    'import/resolver': {
      // Related to the usage of the babel-plugin-module-resolver (https://github.com/tleunen/babel-plugin-module-resolver)
      'babel-module': {},
    },
  },
  'rules': {
    // Airbnb / eslint
    'no-underscore-dangle': 0, // Allow names with underscores and their usage
    'arrow-parens': [2, 'as-needed'], // Ignore single parameter functions on arrow function definition
    'react/prefer-stateless-function': 0, // Allow React component to be a class and not to be a pure functions strictly
    'jsx-a11y/anchor-is-valid': [2, { // Check for valid react-router <Link />
      'components': ['Link'],
      'specialLink': ['to'],
      'aspects': ['noHref', 'invalidHref', 'preferButton'],
    }],
    'react/jsx-curly-spacing': [2, 'never'], // Enforce the usage of the no spaces between curly brackets
    'object-curly-spacing': [2, 'never'], // Overwrite airbnb defaults to use no spaces between curly brackets
    'max-len': [2, { // Overwrite airbnb defaults to use 2-spaced indents and 120 line length
      'code': 120,
      'tabWidth': 2,
    }],
    // Unicorn
    'unicorn/filename-case': 0, // Remove necessity of the file special filename casing, because we need to use kebabCase for the most of the files, but for classes and react components we should prefer PascalCasing
    // JSDoc
    'jsdoc/check-param-names': 2,
    'jsdoc/check-tag-names': 2,
    'jsdoc/check-types': 2,
    'jsdoc/newline-after-description': 2,
    'jsdoc/no-undefined-types': 2, // FIXME Set this field to '0' when Flow will be in
    'jsdoc/require-description-complete-sentence': 2,
    'jsdoc/require-example': 2,
    'jsdoc/require-hyphen-before-param-description': 2,
    'jsdoc/require-param': 2,
    'jsdoc/require-param-description': 2,
    'jsdoc/require-param-name': 2,
    'jsdoc/require-param-type': 2, // FIXME Set this field to '0' when Flow will be in
    'jsdoc/require-returns-description': 2,
    'jsdoc/require-returns-type': 2, // FIXME Set this field to '0' when Flow will be in
    'jsdoc/valid-types': 2,
    // Promise
    "promise/catch-or-return": 0, // Allow omitting of the catch definition
    'promise/no-nesting': 2, // No nested promises, just chains
    'promise/no-promise-in-callback': 0, // Ignore rule for Node.js
    'promise/no-callback-in-promise': 0, // Ignore rule for Node.js
    'promise/avoid-new': 0, // Force the usage of the new while dealing with the Promise (e.g. new Promise(resolve, reject), not Promise.resolve())
    'promise/no-return-in-finally': 2, // Avoid returning any values in finally
    'promise/valid-params': 2, // Always valid number of arguments should be provided to the promise's functions
    // Lodash
    'lodash/import-scope': [2, 'full'], // To ease the use of the lodash in code (do not mind about optimization, because webpack plugin will take all the tree-shaking job)
    'lodash/prefer-reject': 0, // Its much more readable instead of additional wrapping
    'lodash/prefer-matches': 0, // Its much more readable instead of additional wrapping
    'lodash/prefer-over-quantifier': 0, // Its much more readable instead of additional wrapping
    'lodash/prefer-lodash-method': [2, { // Whitelist all of the native functions, but force to use lodash for the rest of the cases
      'ignoreMethods': [ // We donn't care for these methods about how the user write code using lodash or not
        'concat', 'fill', '(last)?IndexOf', 'join', 'reverse', 'slice',
        'find(Index)?', 'each', 'forEach', 'every', 'filter', 'includes', 'map', 'reduce(Right)?', 'some', 'partial',
        'assign', 'keys', 'values', 'repeat', 'template', 'to(Lower|Upper|Pairs)', 'trim', 'replace', 'is(Array|NaN)',
        'slice', 'splice', 'entries'
      ]
    }],
    // Ignore native realization for methods from the list below, but prefer native for everything else from the list (www.npmjs.com/package/eslint-plugin-you-dont-need-lodash-underscore)
    'you-dont-need-lodash-underscore/compact': 0, // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/flatten': 0, // We don't want to write massive equivalent, so, lodash here is an order of magnitude better than native one
    'you-dont-need-lodash-underscore/flatten-deep': 0, // We don't want to write massive equivalent, so, lodash here is an order of magnitude better than native one
    'you-dont-need-lodash-underscore/from-pairs': 0, // We don't want to write massive equivalent, so, lodash here is an order of magnitude better than native one
    'you-dont-need-lodash-underscore/without': 0, // We don't want to write massive equivalent, so, lodash here is an order of magnitude better than native one
    'you-dont-need-lodash-underscore/group-by': 0, // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/min-by': 0, // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/max-by': 0, // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/range': 0, // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/size': 0, // We want to use lodash instead, because it's shorter
    'you-dont-need-lodash-underscore/uniq': 0, // We don't want unreadable and not self-descriptive code
  },
  'plugins': [
    'jest',
    'promise',
    'unicorn',
    'jsdoc',
    'lodash'
  ],
};
