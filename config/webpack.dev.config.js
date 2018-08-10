const webpack = require('webpack');
const ReactJssHmrPlugin = require('react-jss-hmr/webpack');
const PATHS = require('./webpack.paths');

const config = {
    mode: 'development',
    devtool: 'eval', // devtool: 'inline-source-map',
    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        cacheGroups: {
          vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: 'vendor',
             chunks: 'initial',
             enforce: true
           }
        }
      },
    },
    plugins: [
      // new webpack.HotModuleReplacementPlugin()
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
      plugins: [
        new ReactJssHmrPlugin()
      ]
    },
    devServer: {
      contentBase: PATHS.outputPath,
      compress: false,
      historyApiFallback: true,
      hot: true,
      port: 8080
    }
};

module.exports = config;
