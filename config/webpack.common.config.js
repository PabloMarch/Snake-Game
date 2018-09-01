const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PwaManifestWebpackPlugin = require('pwa-manifest-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const pkg = require('../package.json');
const PATHS = require('./webpack.paths');
const MANIFEST = require('./manifest.config')

const commonConfig = env => ({
  entry: {
    app: './src/index.js'
  },
  resolve: {
    alias: {
      components: PATHS.components,
      store: PATHS.store,
      src: PATHS.app,
      lib: PATHS.lib
    },
    extensions: ['*', '.js', '.jsx', '.jss', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: PATHS.app,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        include: PATHS.app,
        use: [
          env != 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader : 'url-loader',
            options: {
              name: '[path][name].[ext]',
              context: PATHS.app,
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // hook into the compiler to extract progress information
    new webpack.ProgressPlugin(),
    // export promises and fetch to use internally
    new webpack.ProvidePlugin({
      'Promise': 'exports-loader?global.Promise!es6-promise',
      'fetch': 'exports-loader?self.fetch!whatwg-fetch'
    }),
    // extract html from template
    new HtmlWebPackPlugin({
      template: PATHS.template,
      favicon: PATHS.favicon,
      inject: true
    }),
    // add manifest.json file
    new PwaManifestWebpackPlugin(MANIFEST),
    // activate service worker
    new GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      precacheManifestFilename: 'precache.[manifestHash].js',
      runtimeCaching: [{
        urlPattern: new RegExp(pkg.homepage),
        handler: 'staleWhileRevalidate'
      }]
    })
  ]
});

module.exports = commonConfig;
