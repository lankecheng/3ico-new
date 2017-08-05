const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {resolve} = require('./utils');

const NODE_ENV = process.env.NODE_ENV = 'test';
const config = require('../config/test');
const webpackBaseConfig = require('./webpack.base.conf')(NODE_ENV);

const filenameHash = config.filenameHash;

const webpackConfig = merge(webpackBaseConfig, {
    output: {
        filename: filenameHash ? '[name].[chunkhash].js' : '[name].js?[chunkhash]',
        path: resolve('dist'),
        chunkFilename: filenameHash ? '[name].[chunkhash].js' : '[name].js?[chunkhash]', // for the require.ensure
        publicPath: config.staticPath
    },
    performance: {
        hints: 'warning'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: config.sourceMap,
                                minimize: true,
                            }
                        },
                        'postcss-loader',
                        "sass-loader?sourceMap",
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /(node_modules)/,
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        sourceMap: config.sourceMap,
                                        minimize: true,
                                    }
                                },
                                "sass-loader?sourceMap",
                            ],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: filenameHash ? '[name].[contenthash].css' : '[name].css?[contenthash]',
            allChunks: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                // drop_console: true,
                dead_code: true
            },
            sourceMap: config.sourceMap,
            output: {
                comments: false
            }
        }),
    ]
});

module.exports = webpackConfig;
