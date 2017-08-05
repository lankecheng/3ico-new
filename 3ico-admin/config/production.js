module.exports = {
    NODE_ENV: 'production',
    API_ORIGIN: 'http://172.16.200.15:8080',

    sourceMap: false,
    devtool: false, //or source-map
    eslint: false,
    //静态资源cdn路径
    staticPath: '',
    //图片资源cdn路径
    imgPath: '',
    //生成带hash文件名
    filenameHash: false,
};
