const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

// variables
const isProduction = process.argv.indexOf('production') >= 0;
const env = isProduction ? 'production' : 'development';
const sourcePath = path.join(__dirname, './src/client');
const outPath = path.join(__dirname, './build');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: isProduction ? 'production' : 'development',
    context: sourcePath,
    entry: {
        app: './index.tsx'
    },
    output: {
        path: `${outPath}/assets/`,
        publicPath: '/',
        filename: isProduction ? '[contenthash].js' : '[hash].js',
        chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js'
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
            WS_URL: isProduction ? '' : 'http://0.0.0.0:4000',
            NODE_ENV: env,
            DEBUG: false
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[hash].css',
            disable: !isProduction
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
            append: {
                head: `<script src="https://cdn.polyfill.io/v3/polyfill.min.js"></script>`
            },
            meta: {
                title: pkg.name,
                description: pkg.description,
                keywords: Array.isArray(pkg.keywords) ? pkg.keywords.join(',') : undefined
            }
        })
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        inline: true,
        historyApiFallback: {
            disableDotRule: true
        },
        stats: 'minimal',
        clientLogLevel: 'warning',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    },
    devtool: isProduction ? undefined : 'cheap-module-source-map'
};
