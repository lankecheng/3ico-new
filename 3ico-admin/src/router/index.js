import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: ROUTER_MODE, // history, hash, abstract
    // base: __dirname,
    // mode: only HTML5 history
    // scrollBehavior: (to, from, savedPosition) => {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return {x: 0, y: 0}
    //   }
    // },
    routes,
});

export default router;
