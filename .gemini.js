module.exports = {
  rootUrl: 'https://localhost:8080',
  gridUrl: 'http://localhost:4444/wd/hub',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
  },
  system: {
    plugins: {
      babel: {}, // Allow babel polyfills to be used with gemini (it'll pick babel.config.js configs automatically)
    },
    exclude: [
      'node_modules/*', // Ignore node modules (we got nothing to test here)
      'specs/*', // Ignore Gherkin tests
      'configs/*', // Ignore all the configs
    ],
    coverage: {
      exclude: [
        'node_modules/*', // Ignore node modules (we got nothing to cover here)
        'specs/*', // Ignore Gherkin tests
        'configs/*', // Ignore all the configs
      ],
    },
  },
};
