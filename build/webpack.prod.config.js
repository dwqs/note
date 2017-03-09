/**
 * Created by pomy on 08/03/2017.
 */


'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let prodConfig = require('./webpack.base.config');
let config = require('../config');
let projectRoot = path.resolve(__dirname, '../');
let ReplaceAssert = require('./replaceAssets');

prodConfig.module.rules.unshift({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    include: [
        path.join(projectRoot, 'client')
    ],
    use: [{loader:'babel-loader'}]
},{
    test:/\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader",{
            loader: 'postcss-loader',
            options:{
                plugins: [
                    require('precss'),
                    require('autoprefixer')({ browsers: ['last 5 versions','Android >= 4.0', 'iOS >= 7'] })
                ],
                sourceMap: "inline"
            }
        }]
    })
});

prodConfig.plugins = (prodConfig.plugins || []).concat([
    new ReplaceAssert(),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
        'process.env': config.build.env
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        comments: false,
        sourceMap: true,
        mangle: true
    })
]);

module.exports = Object.assign({},prodConfig,{
    entry: {
        app:[path.resolve(__dirname, '../client/page/index.js')]
    },
    output: {
        filename: '[name].js',
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        sourceMapFilename: '[file].map'
    },
    devtool:'source-map'
});