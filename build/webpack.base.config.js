/**
 * Created by pomy on 08/03/2017.
 */

'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, '../client'),
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]?[hash]'
                    }
                }], // use: [{loader:'url-loader'}],its alias is loader
            },
            {
                test: /\.(swf|eot|svg|ttf|woff|svg)$/,
                use: ["file-loader"]
            }
        ]
    },
    resolve:{
        extensions:[".js",".jsx"],
        modules: [path.join(__dirname, '../node_modules')],
        alias:{
            '@client': path.resolve(__dirname, '../client'),
            '@components': path.resolve(__dirname, '../client/components')
        }
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    performance: {
        hints: false
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: ['react','react-router','react-dom'],
            filename: "common.js"
            // minChunks: 3
        })
    ]
};
