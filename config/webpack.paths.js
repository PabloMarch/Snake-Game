const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  app: path.resolve(__dirname, '../src'),
  components: path.resolve(__dirname, "../src/components"),
  outputPath: path.resolve(__dirname, '../build'),
  recordsPath: path.join(__dirname, '../build', 'records.json'),
  template: './src/index.ejs',
  favicon: './src/favicon.ico'
};
