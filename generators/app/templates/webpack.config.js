'use strict';

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: path.join(__dirname, 'src', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body'
    })
  ],
};