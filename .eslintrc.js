module.exports = {
  "extends": [
    "airbnb",
    "plugin:jest/recommended"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [
          "app",
          "app/src"
        ]
      }
    }
  },
  "rules": {
    "no-underscore-dangle": "off", // Allow names with underscores and their usage
    "no-trailing-spaces": ["error", {"skipBlankLines": true}], // Allow whitespaces if line is empty
    "arrow-parens": ["error", "as-needed"], // Ignore single parameter fucntions on arrow function definition
    "react/prefer-stateless-function": "off", // Allow React component to be a class and not to be a pure functions strictly
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"],
      "aspects": ["noHref", "invalidHref", "preferButton"]
    }]
  },
  "plugins": ["jest"]
};
