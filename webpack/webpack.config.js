const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    noParse: function (content) {
      return /jquery|lodash/.test(content);
    },
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: loader => [
                require('autoprefixer')(),
                // 这里可以使用更多配置，如上面提到的 postcss-cssnext 等
                // require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              // mozjpeg: { progressive: true, quality: 65 },
              // optipng: { enabled: false },
              // pngquant: { quality: '65-90', speed: 4 },
              // gifsicle: { interlaced: false },
              // webp: { quality: 75 }
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',  // 最终输出的文件名
      chunkFilename: '[id].[hash].css'
    }),
    new OptimizeCssAssetsPlugin({}),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      title: "leo study!",  // 生成的文件标题
      filename: "main.html",  // 最终生成的文件名
      template: './index.html',
      minify: {  // 压缩选项
        collapseWhitespace: true,  // 移除空格
        removeComments: true,  // 移除注释
        removeAttributeQuotes: true,  // 移除双引号
      }
    })
  ]
}
