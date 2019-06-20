module.exports = {
  'extends': [
    'airbnb',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:lodash/canonical',
    'plugin:you-dont-need-lodash-underscore/all',
    'plugin:compat/recommended',
    'plugin:flowtype/recommended',
  ],
  'plugins': [
    'jest',
    'babel',
    'promise',
    'unicorn',
    'jsdoc',
    'lodash',
    'compat',
    'sort-class-members',
    'flowtype',
  ],
  'parser': 'babel-eslint',
  'env': { // You might have seen, that there is no 'es6: true' and etc. This is because it's inherited from plugins configurations
    'worker': true,
    'shared-node-browser': true,
  },
  'globals': {
    'BigInt': true, // Allow to use BigInt
    'gemini': true, // Allow gemini to be used globally (WARNING maybe it's a mistake, because it's defined in the package.json as a devDependency, but mustn't be a dependency as eslint tells us)
  },
  'settings': {
    'import/resolver': {
      'babel-module': {
        'root': [ // Same as in babel.config.js, but for ESLint
          './', // Project root
        ],
        'alias': {
          'react-dom': '@hot-loader/react-dom', // To make eslint not to swear on react-dom imports (for more info see webpack.base.config.js)
        },
      },
      'extensions': [ // Available extensions to be resolved via babel-module
        '.js',
        '.jsx',
        '.mjs',
        '.js.flow',
      ],
    },
    'polyfills': [ // Add babel polyfills here that is compatible with browsers from the .browserslistrc (see more at https://github.com/amilajack/eslint-plugin-compat/wiki/Adding-polyfills)
      'Promise',
      'fetch',
    ],
    'flowtype': {
      'onlyFilesWithFlowAnnotation': true
    },
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
    'react/prop-types': [0],
    'import/extensions': [2, 'ignorePackages', {'js': 'never'}, {'jsx': 'never'}, {'mjs': 'never'}, {'js.flow': 'never'}],
    'import/prefer-default-export': [0], // Allow the usage of the single exported element and make imports of the oru own modules easier
    'object-curly-spacing': [0], // Allow eslint-babel-plugin to handle this rule
    'valid-typeof': [0], // Allow eslint-babel-plugin to handle this rule
    'max-len': [2, { // Overwrite airbnb defaults to use 2-spaced indents and 100 line length
      'code': 100,
      'tabWidth': 2,
      'ignoreTrailingComments': true, // Allow non-fixed comments on the same line as
    }],
    // Unicorn
    'unicorn/filename-case': [0], // Remove necessity of the file special filename casing, because we need to use kebabCase for the most of the files, but for classes and react components we should prefer PascalCasing
    'unicorn/no-process-exit': [0], // Ignore rule for Node.js
    'unicorn/no-new-buffer': [0], // Ignore rule for Node.js
    'unicorn/prevent-abbreviations': [2, {
      replacements: { // Enable some well-known abbreviations in any variation
        'props': false,
        'env': false,
        'dev': false,
        'prod': false,
        'rc': false,
      },
      whitelist: { // Whitelist config-related abbreviations
        'filesExt': true,
        'rootDir': true,
      }
    }],
    'unicorn/custom-error-definition': [2], // Force the only correct subclassing of the Error object
    // JSDoc
    'jsdoc/check-param-names': [2],
    'jsdoc/check-tag-names': [2],
    'jsdoc/check-types': [2],
    'jsdoc/newline-after-description': [2],
    'jsdoc/no-undefined-types': [2],
    'jsdoc/require-description-complete-sentence': [0], // Its off, beacuse it's quite buggy (so it cannot recognize where sentence ends and starts)
    'jsdoc/require-example': [0],
    'jsdoc/require-hyphen-before-param-description': [0],
    'jsdoc/require-param': [2],
    'jsdoc/require-param-description': [2],
    'jsdoc/require-param-name': [2],
    'jsdoc/require-param-type': [0],
    'jsdoc/require-returns-description': [0],
    'jsdoc/require-returns-type': [0],
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
        'concat', 'fill', '(last)?IndexOf', 'join', 'reverse', 'slice', 'split',
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
    // Babel
    "babel/object-curly-spacing": [2, 'never'], // Overwrite airbnb defaults to use no spaces between curly brackets and allows the usage of the non-named export syntax
    "babel/valid-typeof": [2], // Overwrite defaults to support BigInt
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
        '[react-lifecycle-properties]',
        '[conventional-private-properties]',
        '[static-properties]',
        '[properties]',
        '[arrow-function-properties]',
        'constructor',
        '[getters]',
        '[setters]',
        '[conventional-private-methods]',
        '[private-callbacks]',
        '[static-methods]',
        '[methods]',
        '[callbacks]',
        '[react-lifecycle-methods]',
      ],
      'accessorPairPositioning': 'getThenSet',
    }],
    // Flow
    'flowtype/array-style-complex-type': [2, 'verbose'], // Make type declarations to be more readable (extend recommended configuration)
    'flowtype/array-style-simple-type': [2, 'verbose'], // Make type declarations to be more readable (extend recommended configuration)
    'flowtype/define-flow-type': [2], // Do not use undefined flow types
    'flowtype/delimiter-dangle': [2, 'always-multiline'], // It's all about trailing commas, but in flow types
    'flowtype/newline-after-flow-annotation': [2, "always"], // Always put new line after flowtype init declaration (extend recommended configuration)
    'flowtype/no-dupe-keys': [2], // No duplicates in type definitions (extend recommended configuration)
    'flowtype/no-existential-type': [2], // Disallows use of the existential type (*) (extend recommended configuration)
    'flowtype/no-flow-fix-me-comments': [1], // Warn if flowtype fix-me declaration would be used somewhere in code (extend recommended configuration)
    'flowtype/no-mutable-array': [2], // No usage of the mutable arrays (extend recommended configuration)
    'flowtype/no-primitive-constructor-types': [2], // Disallows use of primitive constructors as types, such as Boolean, Number and String (extend recommended configuration)
    'flowtype/no-unused-expressions': [2], // An extension of ESLint's no-unused-expressions (extend recommended configuration)
    'flowtype/no-weak-types': [1], // Warns against weak type annotations any, Object and Function, but should be used ONLY for the first code implementation
    'flowtype/object-type-delimiter': [2, 'comma'], // Delimiter in type declarations (extend recommended configuration)
    'flowtype/require-compound-type-alias': [2, 'always'], // Always separate type declarations from their usage if multiple types are being provided (extend recommended configuration)
    'flowtype/require-exact-type': [2, 'always'], // Prefer exact types (extend recommended configuration)
    'flowtype/require-parameter-type': [2], // Require function's parameters to be assigned with types
    'flowtype/require-return-type': [2, 'always'], // Requires function's returning value to be assigned with type
    'flowtype/require-types-at-top': [2, 'always'], // Require all type declarations to be at the top of the file, after any import declarations (extend recommended configuration)
    'flowtype/require-variable-type': [0], // Do not require variables types to be declared (extend recommended configuration)
    'flowtype/semi': [2], // Require semicolons in type declarations
    'flowtype/type-import-style': [2, 'declaration'], // Enforce short type import declaration (extend recommended configuration)
  },
};
