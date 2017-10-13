var webpack = require('webpack');
const isProd = process.argv.includes('--prod')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: {entry1: 'script.js', entry2: 'ref/app.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  resolve: {
    modules: [
      path.resolve('./'),
      'node_modules'
    ]
  },
//   devtool: 'source-map',
   module: {
    rules: [
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: {
                emitError: true,
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {
                    attrs: [':data-src']
                }
            }
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new UglifyJSPlugin({
        sourceMap:true
    })
  ]
};