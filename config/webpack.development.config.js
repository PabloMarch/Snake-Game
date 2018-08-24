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
      // when activate it makes the game to reload completely on changes
      // if active --hot param needs to be removed from cli params
      // this issue is related to activation of ReactJssHmrPlugin
      // new webpack.HotModuleReplacementPlugin(),
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
      disableHostCheck: true,
      host: '0.0.0.0',
      watchOptions: {
        ignored: /node_modules/
      }
    }
};

module.exports = config;
