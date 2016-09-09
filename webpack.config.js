var webpack = require('webpack');  
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');

module.exports = {  
    entry: {
        app: [path.join(srcPath, 'index.js')],
    },
    output: {
        path: distPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel', presets: ['es2015', 'react'] },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            favicon: path.join(srcPath, 'favicon.ico'),
        }),
        new CopyWebpackPlugin([
            { from: path.join(srcPath, 'site.css') }
        ]),
    ]
};