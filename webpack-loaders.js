// The path module provides utilities for working with file and directory paths.
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        test: /\.js$/,
        exclude: /bower_components/,
        use: [
            { loader: 'babel-loader', options: {sourceMaps: true} }
        ]
    },
    {
        test: /\.css$/,
        exclude: /vendor/,
        use: [
            { loader: 'style-loader/url' },
            { loader: 'file-loader?name=css/[name].[ext]'},
        ]
    },
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
//    {
//        test: /\.css$/,
//        use: ExtractTextPlugin.extract({
//            fallback: "style-loader",
//            use: "css-loader"
//        })
//    },
//    {
//        test: /\.scss$/,
//        use: [
//            { loader: 'style-loader' },
//            { loader: 'css-loader' },
//            { loader: 'sass-loader' }
//        ]
//    },
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
    {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
    }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
            { loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
            { loader: 'file-loader?name=css/fonts/[name].[ext]' }
        ]
    }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=css/fonts/[name].[ext]'
    },
    {
        test: /\.(jpg|jpeg|png|gif)$/,
        exclude: /node_modules/,
//        loader: 'url-loader'
        loader: 'file-loader?name=images/[name].[ext]'
    }
//    {
//        test: /\.jpg$/,
//        exclude: /node_modules/,
//        loader: 'file'
//    }, {
//        test: /\.png$/,
//        exclude: /node_modules/,
//        loader: 'url'
//    }
];
