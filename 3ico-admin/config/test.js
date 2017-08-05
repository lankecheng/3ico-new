const merge = require('webpack-merge');
const production = require('./production');

module.exports = merge(production, {
    NODE_ENV: 'test',
    API_ORIGIN: '',

    sourceMap: true,
    devtool: 'source-map',
    eslint: true,
    //静态资源cdn路径
    staticPath: '',
    //图片资源cdn路径
    imgPath: '',
    //生成带hash文件名
    filenameHash: false,
});
