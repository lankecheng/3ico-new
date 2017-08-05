const webpack = require('webpack');
const merge = require('webpack-merge');

const {resolve} = require('./utils');

const NODE_ENV = process.env.NODE_ENV = 'development';
const config = require('../config/development');
const webpackBaseConfig = require('./webpack.base.conf')(NODE_ENV);

const filenameHash = config.filenameHash;

const webpackConfig = merge(webpackBaseConfig, {
    output: {
        filename: filenameHash ? '[name].[hash].js' : '[name].js?[hash]',
        path: resolve('dist'),
        chunkFilename: filenameHash ? '[name].[hash].js' : '[name].js?[hash]', // for the require.ensure
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,

                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader?sourceMap'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader?sourceMap'},
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /(node_modules)/,
                options: {
                    loaders: {
                        scss: "vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap",
                    }
                }
            },
        ]
    },
    plugins: [
    ],
    devServer: {
        contentBase: resolve('dist'),
        compress: true,
        port: config.port,
        historyApiFallback: true
    }
});

module.exports = webpackConfig;
