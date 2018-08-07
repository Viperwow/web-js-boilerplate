module.exports = {
  "extends": [
    "airbnb",
    "plugin:jest/recommended"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jest": true,
    "worker": true,
    "es6": true
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  "rules": {
    "no-underscore-dangle": "off", // Allow names with underscores and their usage
    "no-trailing-spaces": ["error", {"skipBlankLines": true}], // Allow whitespaces if line is empty
    "arrow-parens": ["error", "as-needed"], // Ignore single parameter functions on arrow function definition
    "react/prefer-stateless-function": "off", // Allow React component to be a class and not to be a pure functions strictly
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"],
      "aspects": ["noHref", "invalidHref", "preferButton"]
    }],
    "linebreak-style": "off", // Do not mind about line ending
    "import/extensions": "never",
    "import/no-unresolved": [2, { "commonjs": true, "amd": true }],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "one-var": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"]
  },
  "plugins": ["jest"]
};
