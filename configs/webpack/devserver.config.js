module.exports = {
  host: "0.0.0.0", // Local machine ip address + localhost
  compress: true, // Compress things using gzip
  hot: true, // Hot module reloading enabled (no need of --hot in CLI)
  hotOnly: true, // Do no update app in case of failure while HMR
  historyApiFallback: { // Proxying to index file
    disableDotRule: true
  },
  quiet: false, // Is need to be set as "false" to work with "stats"
  noInfo: false, // Is need to be set as "false" to work with "stats"
  stats: { // Controls the informational output to the console (see https://webpack.js.org/configuration/stats/ for more info)
    chunks: false,
    colors: true // Show colors in CLI (no need of --color or --colors in CLI)
  },
  inline: true, // Inject dev server into code and nice console log (see https://github.com/webpack/docs/wiki/webpack-dev-server#inline-mode for more info)
  disableHostCheck: true, // THIS IS NOT RECOMMENDED because the app that do not check the host are vulnerable to DNS rebinding attacks
  proxy: { // Where to proxy requests
    '/api': {
      target: 'http://localhost:9090', // Server address with port
      changeOrigin: true // Allow different origin (not the current machine)
    }
  }
};
