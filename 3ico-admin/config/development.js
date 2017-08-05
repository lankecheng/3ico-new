const merge = require('webpack-merge');
const production = require('./production');

module.exports = merge(production, {
    //开发 devServer 端口
    port: 9001,

    NODE_ENV: 'development',
    API_ORIGIN: 'http://119.23.160.90:8080',

    //sourceMap开发环境强制开启
    // sourceMap: true,
    devtool: 'cheap-module-eval-source-map',
    eslint: false,
    //静态资源cdn路径
    staticPath: '',
    //图片资源cdn路径
    imgPath: '',
    //生成带hash文件名
    filenameHash: false,
});
