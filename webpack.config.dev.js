const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    //__dirname will give current directory name
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    stats: 'minimal',
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {"Access-Control-Allow-Origin": "*"},
    https: false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    })
  ],
  //tell webpack what files we want to handle
  module: {
    rules: [
      //will run babel on all javascript files
      {
        test: /\.(js|jsx)$/,
        exclude: /mode_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      //will run babel on css
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
