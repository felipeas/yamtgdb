var webpack = require('webpack');  

module.exports = {  
    entry: [
      "./app.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel', presets: ['es2015', 'react'] },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
};