var webpack = require('webpack');

// The path module provides utilities for working with file and directory paths.
var path = require('path');

var loaders = require("./webpack-loaders");
var preloaders = require("./webpack-preloaders");

// Plugins
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // Absolute path for resolving entry option.
    context: path.resolve(__dirname, '../src'),
    // Entry point for the bundle
    entry: {
        app: './index.js'
    },
    // Output compilation file.
    output: {
        //path: path.join(__dirname, '../dist'),
        path: path.join(__dirname, '../'),
        filename: 'js/[name].js'
    },
    // Options for resolving module requests
    resolve: {
        extensions: ['.js', '.json']
    },
    // Enhance debugging by adding meta info for the browser devtools
    devtool: "resolveLoader",

    // List of modules
    module:{
        rules: loaders
    },

    // List of plugins
    plugins: [
        new CommonsChunkPlugin({
            name: 'commons',
            filename : "js/[name].js",
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',//But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            filename: 'js/[name].js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
//            inject: false,
//            template: require('html-webpack-template'),
            hash: true
        })
    ],
};
