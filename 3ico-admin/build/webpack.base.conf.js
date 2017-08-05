const webpack = require('webpack');

const Htmlplugin = require('html-webpack-plugin');

const {resolve} = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const config = require('../config')(NODE_ENV);
    const webpackConfig = {
        entry: {
            app: resolve('src', 'index.js'),
            vendor: config.vendor,
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'mtue': '@meitu/mtue',
            }
        },
        devtool: config.devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.(jpe?g|svg|png|gif|webp|ttf|eot|woff|woff2)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        publicPath: config.imgPath,
                        // outputPath: '',
                        useRelativePath: false,
                        name: config.filenameHash ? '[hash].[ext]' : '[name].[ext]?[hash]'
                    }
                },
            ]
        },
        plugins: [
            new Htmlplugin({
                template: resolve('src', 'index.template.html'),
                filename: 'index.html',
                inject: 'body',
                minify: {
                    removeComments: true,
                }
            }),
            new webpack.DefinePlugin({
                'NODE_ENV': JSON.stringify(config.NODE_ENV),
                'API_ORIGIN': JSON.stringify(config.API_ORIGIN),
                'ROUTER_MODE': JSON.stringify(config.ROUTER_MODE)
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),
        ],
    }

    if (config.eslint) {
        webpackConfig.module.rules.push({
            test: /\.(js|vue)$/,
            enforce: 'pre',
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        });
    }

    return webpackConfig;
};
