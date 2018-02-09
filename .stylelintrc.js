module.exports = {
  "extends": [
    "stylelint-config-standard", // Best practices for stylelinting
    "stylelint-config-sass-guidelines" // Sass related rules
  ],
  "rules": { // Let's us to use SugarCSS/Sass syntax without getting errors (see https://github.com/stylelint/stylelint-config-standard#using-the-config-with-sugarss-syntax for more info)
    "block-closing-brace-empty-line-before": null,
    "block-closing-brace-newline-after": null,
    "block-closing-brace-newline-before": null,
    "block-closing-brace-space-before": null,
    "block-opening-brace-newline-after": null,
    "block-opening-brace-space-after": null,
    "block-opening-brace-space-before": null,
    "declaration-block-semicolon-newline-after": null,
    "declaration-block-semicolon-space-after": null,
    "declaration-block-semicolon-space-before": null,
    "declaration-block-trailing-semicolon": null
  }
};
