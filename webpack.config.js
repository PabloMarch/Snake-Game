const merge = require('webpack-merge');
const commonConfig = require('./config/webpack.common.config');

const envConfig = require(`./config/webpack.${process.env.NODE_ENV}.config`);

module.exports = merge(commonConfig, envConfig);
