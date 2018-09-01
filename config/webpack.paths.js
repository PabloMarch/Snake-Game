const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  app: path.resolve(__dirname, '../src'),
  components: path.resolve(__dirname, "../src/components"),
  store: path.resolve(__dirname, "../src/store"),
  lib: path.resolve(__dirname, "../src/lib"),
  outputPath: path.resolve(__dirname, '../build'),
  recordsPath: path.join(__dirname, '../records.json'),
  icon: './src/assets/icon.png',
  template: './src/index.ejs',
  favicon: './src/favicon.ico'
};
