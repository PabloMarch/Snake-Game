const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PwaManifestWebpackPlugin = require('pwa-manifest-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const pkg = require('../package.json');
const PATHS = require('./webpack.paths');

const MANIFEST = {
  'name':             pkg.description,
  'short_name':       pkg.name,
  'manifest_version': 1.0,
  'version':          pkg.version,
  'start_url':        '.',
  'display':          'fullscreen',
  'orientation':      'landscape',
  'background_color': '#000000',
  'theme_color':      '#3f51b5',
  'icon': {
    'src': PATHS.icon,
    'sizes': [48, 72, 96, 144, 168, 192]
  },
  'applications': {
    'gecko': {
      'id': 'clients@orbitdevs.com'
    },
    'edge': {
      'browser_action_next_to_addressbar': true
    }
  }
}

const commonConfig = env => ({
  entry: {
    vendor: Object.keys(pkg.dependencies),
    app: './src/index.js'
  },
  output: {
    path: PATHS.outputPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      components: PATHS.components,
      store: PATHS.store,
      src: PATHS.app
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
      runtimeCaching: [{
        urlPattern: new RegExp(pkg.homepage),
        handler: 'staleWhileRevalidate'
      }]
    })
  ]
});

module.exports = commonConfig;
