'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

console.log('ENV IS: ', process.env.NODE_ENV);

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: path.join(__dirname, 'src', 'app.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.(png|jpg|gif)/, use: 'file-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body'
    })
  ],
};