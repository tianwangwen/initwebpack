const path = require('path');

const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const webpack = require('webpack');


let devConfig = {

  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, '..'),
    }
  },
    

  output: {

    filename: 'main.js',

    path: path.resolve(__dirname, '../dist')

  },
  devServer: {

    contentBase: path.join(__dirname, '../dist'),

    compress: true,

    hot: true,

    overlay: true,

    open: true,

    publicPath: '/',

    host: 'localhost',

    port: '1200'

  },

  module: {

    rules: [{

      test: /\.(sc|c|sa)ss$/,

      use: [

        'style-loader', {

          loader: "css-loader",

          options: { sourceMap: true }

        }, {

          loader: "postcss-loader",

          options: {

            ident: "postcss", sourceMap: true,

            plugins: loader => [require('autoprefixer')()]

          }

        }, {

          loader: "sass-loader",

          options: { sourceMap: true }

        }

      ]

    }]

  },
  plugins: [

    new webpack.NamedModulesPlugin(),  // 更容易查看（patch）的以来

    new webpack.HotModuleReplacementPlugin() // 替换插件

  ]

}

module.exports = merge(common, devConfig)