const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

// variables
const isProduction = process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src/client');
const outPath = path.join(__dirname, './dist');

// Only prod and dev environments are supported
const env = isProduction ? 'production' : 'development';

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: env,
    context: sourcePath,
    entry: {
        app: './index.tsx'
    },
    output: {
        path: `${outPath}/assets/`,
        publicPath: isProduction ? 'assets/' : '/',
        filename: isProduction ? '[contenthash].js' : '[chunkhash].js',
        chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[chunkhash].js'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    !isProduction && {
                        loader: 'babel-loader',
                        options: { plugins: ['react-hot-loader/babel'] }
                    },
                    'ts-loader'
                ].filter(Boolean)
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction,
                            importLoaders: 1
                        }
                    }
                ]
            },
            // static assets
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
            {
                test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: env,
            API_URL: isProduction ? null : 'http://localhost:3000',
            DEBUG: !isProduction
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true
            },
            meta: {
                title: pkg.name,
                description: pkg.description,
                keywords: Array.isArray(pkg.keywords) ? pkg.keywords.join(',') : undefined
            }
        })
    ],
    devServer: {
        static: {
            directory: sourcePath
        },
        hot: true,
        historyApiFallback: true,
        client: {
            logging: 'log'
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    },
    devtool: isProduction ? false : 'cheap-module-source-map'
};
