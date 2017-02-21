const path = require('path')
const webpack = require('webpack')
const fs = require('fs');

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  node: {
    console: true,
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  },

  resolve: {
    extensions: ['', '.json', '.js', '.jsx', '.scss','css', '.png', '.jpg', '.jpeg', '.gif']
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })  
  ],

  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
         
    },
    {
        test: /\.json$/,
        loader: 'json-loader'
      },
       { test: /\.scss?$/,
         loader: 'style!css!sass',
         include: path.join(__dirname, 'src', 'styles') },
       { test: /\.png$/,
         loader: 'file' },
       { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
         loader: 'file'}
    ]
  }
}