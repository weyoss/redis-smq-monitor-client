const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: ['react-hot-loader/patch', './src'],
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: "images/",
                    publicPath: "/images",
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    outputPath: "fonts/",
                    publicPath: "/fonts"
                }
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/scripts",
        filename: "scripts/bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist/"),
        port: 3000,
        publicPath: "http://0.0.0.0:3000",
        historyApiFallback: {
            index: 'index.html'
        },
        watchContentBase: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    watch: true
};