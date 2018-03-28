module.exports = {
  rootUrl: 'https://localhost:8080',
  gridUrl: 'http://localhost:4444/wd/hub',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  system: {
    plugins: {
      babel: {} // It'll pick .babelrc configs automatically
    }
  }
};
