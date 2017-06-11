/**
 * Webpack loaders for es2015 project.
 * 
 * @author Philippe Wronski <philippe.wronski@gmail.com
 */

// The path module provides utilities for working with file and directory paths.
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    // Compile all es2015 files into es5 files.
    {
        test: /\.js$/,
        exclude: /bower_components/,
        use: [
            { loader: 'babel-loader', options: {sourceMaps: true} }
        ]
    },
    // Copy all css files used in modules into dist directory.
    {
        test: /\.css$/,
        exclude: /vendor/,
        use: [
            { loader: 'style-loader/url' },
            { loader: 'file-loader?name=dist/css/[name].[ext]'},
        ]
    },
    // ??
    {
        test: /\.css$/,
        include: [
            /vendor/
        ],
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { root: '.' }},
        ]
    },
    // Extract css from html file into js file.
//    {
//        test: /\.css$/,
//        use: ExtractTextPlugin.extract({
//            fallback: "style-loader",
//            use: "css-loader"
//        })
//    },
    // Compile scss files into css and include it in html file.
//    {
//        test: /\.scss$/,
//        use: [
//            { loader: 'style-loader' },
//            { loader: 'css-loader' },
//            { loader: 'sass-loader' }
//        ]
//    },
    // Compile scss files into css and extract css from html file into js file.
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader'},
                { loader: 'sass-loader?sourceMap' }
            ],
            // Utilisé pour modifier le chemin d'accès aux appels url() dans le sass.
            publicPath: '../'
        })
    },
    // Load html file into dist directory and transform url() into require.
    {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
    },
    // Copy all .woff* font files into dist directory.
    {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
            { loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
            { loader: 'file-loader?name=dist/css/fonts/[name].[ext]' }
        ]
    },
    // Copy all other font files into dist directory.
    {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=css/fonts/[name].[ext]'
    },
    // Copy all images files into dist directory.
    {
        test: /\.(jpg|jpeg|png|gif)$/,
        exclude: /node_modules/,
        // Add image into require.
//        loader: 'url-loader'
        // Add image into dist directory
        loader: 'file-loader?name=dist/images/[name].[ext]'
    }
];
