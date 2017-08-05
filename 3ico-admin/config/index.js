const path = require('path');
const merge = require('webpack-merge');

module.exports = function config (NODE_ENV = 'development') {
    return merge({
        // 定义打包进 vendor 的公共库
        vendor: [
            'vue',
            'vue-router',
            'vuex',
            'axios',
            // 'es6-promise',
            'moment',
            // 'lodash',
            // 'bluebird',
            'vee-validate',
            'element-ui',
        ],
        ROUTER_MODE: 'hash',
    }, require(path.join(__dirname, NODE_ENV)));
}
