const webpack = require('webpack');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PATHS = require('./webpack.paths');

const config = {
  mode: 'production',
  output: {
    path: PATHS.outputPath,
    filename: '[name].[contenthash:8].js'
  },
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
    nodeEnv: 'production',
    runtimeChunk: 'single',
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendor',
           chunks: 'all',
           enforce: true
         }
      }
    },
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
    new BundleAnalyzerPlugin(),
    new CleanWebPackPlugin(
      PATHS.outputPath, {
        root: process.cwd(),
        verbose: true,
        dry: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};

module.exports = config;
