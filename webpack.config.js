const merge = require('webpack-merge');

// import and merge common config with the correct enviroment
module.exports = (env, argv) => merge(
  require('./config/webpack.common.config')(argv.mode),
  require(`./config/webpack.${argv.mode}.config`)
);
