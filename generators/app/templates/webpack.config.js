'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const plugins = [
  new HtmlWebpackPlugin({ template: path.join(__dirname, 'src', 'index.html'), inject: 'body' }),
  new ExtractTextPlugin('[name].css'),
  new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'main', 'bootstrap'] })
];

if (PRODUCTION) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: true } }));
}

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: {
    main: path.join(__dirname, 'src', 'app.jsx'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.(png|jpg|gif)/, use: 'file-loader' },
      { test: /\.(css)$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap')}
    ]
  },
  plugins
};
