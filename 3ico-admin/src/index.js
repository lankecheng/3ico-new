import 'normalize.css';
import './assets/scss/index.scss';

import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import store from './store';
import router from './router';
import components from './components';
import mixins from './mixins';
// import validator from './plugins/validator';

Vue.use(ElementUI);

Object.values(mixins).forEach((mixin) => {
    Vue.mixin(mixin);
});

const app = new Vue({router, store});

window.addEventListener('DOMContentLoaded', () => app.$mount('#js-app'), false);
