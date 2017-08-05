import axios from 'axios';
import {Message} from 'element-ui';
import {tokenHandle} from '../utils';
import router from '../router';

const instance = axios.create({
    baseURL: API_ORIGIN,
    headers: {
        Authorization: tokenHandle.get(),
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret;
    }],
});

export const setHeader = (key, val) => {
    instance.defaults.headers.common[key] = val;
};

const handle = function (res) {
    const data = res.data;
    const errCode = data.errCode;
    const errMsg = data.errMsg;
    if (errCode && errCode !== 0) {
        Message({
            message: errMsg || '未知错误',
            type: 'error'
        });
        return Promise.reject(res);
    } else {
        return Promise.resolve(res);
    }
};

const handleError = function (err) {
    const response = err.response;
    const data = response.data || {};
    const errCode = data.error_code;
    const errMsg = data.error_msg;

    switch (errCode) {
    case 20001:
    // case 20002:
        Message({
            message: errMsg || '未知错误',
            type: 'error'
        });
        router.push({
            path: '/login'
        });
        break;
    default:
        Message({
            message: errMsg || '未知错误',
            type: 'error'
        });
        break;
    }

    return Promise.reject(err);
};

export default {
    get(url, options = {}) {
        return instance.get(url, Object.assign(options, {
            headers: {
                Authorization: tokenHandle.get()
            }
        }))
        .then(handle).catch(handleError);
    },
    post(url, data = {}, config = {}) {
        // let formData = new FormData();
        // for( let key in data){
        //     formData.append(key, data[key]);
        // }
        return instance.post(url, data, Object.assign(config, {
            headers: {
                Authorization: tokenHandle.get()
            }
        }))
        .then(handle).catch(handleError);
    },
    put(url, data = {}, config = {}) {
        // let formData = new FormData();
        // for( let key in data){
        //     formData.append(key, data[key]);
        // }
        return instance.put(url, data, Object.assign(config, {
            headers: {
                Authorization: tokenHandle.get()
            }
        }))
        .then(handle).catch(handleError);
    },
    delete(url, options = {}) {
        return instance.delete(url, Object.assign(options, {
            headers: {
                Authorization: tokenHandle.get()
            }
        }))
        .then(handle).catch(handleError);
    }
};
