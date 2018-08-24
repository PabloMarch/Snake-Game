const webpack = require('webpack');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PATHS = require('./webpack.paths');

const config = {
  mode: 'production',
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
    warnings: false
  },
  recordsPath: PATHS.recordsPath,
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
          ecma: 6,
          output: {
            comments: false
          },
          compress: {
            dead_code: true,
            drop_console: true
          },
          sourceMap: false
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebPackPlugin(PATHS.outputPath, {
      root: process.cwd(),
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    })
  ]
};

module.exports = config;
