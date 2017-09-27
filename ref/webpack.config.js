var webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve('./'),
      'node_modules'
    ]
  },
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
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
// module.exports = {
//     entry: './app.js',
//     output: {
//         path: '.',
//         filename: 'bundle.js'
//     },
//     watch:true,
//     devtool: 'source-map',
//     plugins: [
//         new webpack.optimize.UglifyJsPlugin()
//     ],
//     module: {
       
//         preLoaders: [
//             {
//                 test: /\.jsx?$/,
//                 loader: 'eslint-loader',
//                 exclude: /node_modules/
//             }
//         ],
//         loaders: [{
//                 test: /\.html$/,
//                 loader: 'ng-cache?prefix=[dir]/[dir]'
//             },
            
//             {

//                 test: /\.js?$/,
//                 exclude: /(node_modules|bower_components)/,
//                 loader: 'babel'
//             },
//             {
//                 test: /\.scss$/,
//                 loader: 'sass'
//             },
//             {
//                 //IMAGE LOADER
//                 test: /\.(jpe?g|png|gif|svg)$/i,
//                 loader:'file-loader'
//             },
            
//             {
//                 test: /\.json$/,
//                 loader: 'json-loader'
//             }
              
//         ]
//     },
//     eslint: {
//         failOnWarning: false,
//         failOnError: true
//     },
// }
