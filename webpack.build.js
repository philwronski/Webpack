/**
 * Webpack configuration for es2015 project.
 * This config file must be used for production.
 * 
 * @author Philippe Wronski <philippe.wronski@gmail.com
 */

var webpack = require('webpack');

// The path module provides utilities for working with file and directory paths.
var path = require('path');

// Load the webpack loaders.
var loaders = require("./webpack-loaders");
// Load the proxy for browser sync.
var proxies = require("./webpack-proxy.dev");

// Plugins
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // Absolute path for resolving entry option.
    context: path.resolve(__dirname, './src'),
    // Entry point for the bundle.
    entry: {
        app: './entry.js'
    },
    // Output compilation file.
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    // Options for resolving module requests.
    resolve: {
        extensions: ['.js', '.json']
    },
    // Enhance debugging by adding meta info for the browser devtools.
    devtool: "cheap-eval-source-map",

    // List of loaders.
    module: {
        rules: loaders
    },

    // List of plugins
    plugins: [
        new CommonsChunkPlugin({
            name: 'commons',
            filename: "./js/[name].js",
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory.
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles.
        new webpack.optimize.CommonsChunkPlugin({
            //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            name: 'manifest',
            filename: './js/[name].js'
        }),
        // Make global variable for the project.
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash',
            moment: 'moment'
        }),
        new ExtractTextPlugin({
            filename: "./css/[name].css",
            allChunks: true
        }),
        // Inject compiled javascript in index.html template.
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
            hash: true
        })
    ],
};