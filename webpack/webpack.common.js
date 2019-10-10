const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {

  entry: './src/index.js',

  module: {

    noParse: function (content) { return /jquery|lodash/.test(content); },

    rules: [

      {

        test: /\.(png|svg|jpg|jpeg|gif)$/,

        // include: [path.resolve(__dirname, 'src/')],

        use: [{

          loader: 'url-loader',  // 根据图片大小，把图片转换成 base64

          options: { limit: 10000 },

        }, {

          loader: "image-webpack-loader",

          options: {

            // mozjpeg: { progressive: true, quality: 65 },

            // optipng: { enabled: false },

            // pngquant: { quality: '65-90', speed: 4 },

            // gifsicle: { interlaced: false },

            // webp: { quality: 75 }

          }

        }]

      }, {

        test: /\.(woff|woff2|eot|ttf|otf)$/,

        include: [path.resolve(__dirname, 'src/')],

        use: ['file-loader']

      },
      {

        test: /\.js$/,

        use: [{

          loader: 'babel-loader',

          options: {

            presets: ['@babel/preset-env']

          }

        }],

        exclude: /(node_modules|bower_components)/,

      }
    ]

  },

  plugins: [

    new HtmlWebpackPlugin({

      title: "leo study!",

      filename: "main.html",

      template: path.resolve(__dirname, '../index.html'),

      minify: {

        collapseWhitespace: true,

        removeComments: true,

        removeAttributeQuotes: true,

      }

    }),

    new CleanWebpackPlugin()

  ],

}