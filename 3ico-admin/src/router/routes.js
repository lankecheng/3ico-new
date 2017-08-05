import store from '../store';

const routes = [
    {
        path: '/',
        component: (resolve) => {
            require.ensure(['../views/index.vue'], () => {
                resolve(require('../views/index.vue'));
            });
        },
        children: [
            {
                path: '',
                redirect: 'admin',
            },
            {
                path: 'home',
                component: (resolve) => {
                    require.ensure(['../views/home.vue'], () => {
                        resolve(require('../views/home.vue'));
                    }, 'app');
                }
            },
            {
                path: 'about',
                component: (resolve) => {
                    require.ensure(['../views/about.vue'], () => {
                        resolve(require('../views/about.vue'));
                    }, 'app');
                }
            },
            {
                path: 'contact',
                component: (resolve) => {
                    require.ensure(['../views/contact.vue'], () => {
                        resolve(require('../views/contact.vue'));
                    }, 'app');
                }
            },
            {
                path: 'register',
                component: (resolve) => {
                    require.ensure(['../views/register.vue'], () => {
                        resolve(require('../views/register.vue'));
                    }, 'app');
                }
            },

            {
                path: 'login',
                component: (resolve) => {
                    require.ensure(['../views/login.vue'], () => {
                        resolve(require('../views/login.vue'));
                    }, 'app');
                }
            },
            {
                path: 'reset-pwd',
                component: (resolve) => {
                    require.ensure(['../views/reset-pwd.vue'], () => {
                        resolve(require('../views/reset-pwd.vue'));
                    }, 'app');
                }
            },
            {
                path: 'projects',
                component: (resolve) => {
                    require.ensure(['../views/projects.vue'], () => {
                        resolve(require('../views/projects.vue'));
                    }, 'app');
                }
            },
        ]
    },
    {
        path: '/admin',
        component: require('../views/admin/index.vue'),
        children: [
            {
                path: '',
                redirect: 'console',
            },
            {
                path: 'console',
                component: (resolve) => {
                    require.ensure(['../views/admin/console'], () => {
                        resolve(require('../views/admin/console'));
                    }, 'admin');
                },
            },
            {
                path: 'banner',
                component: (resolve) => {
                    require.ensure(['../views/admin/banner'], () => {
                        resolve(require('../views/admin/banner'));
                    }, 'admin');
                },
            },
            {
                path: 'annc',
                component: (resolve) => {
                    require.ensure(['../views/admin/annc'], () => {
                        resolve(require('../views/admin/annc'));
                    }, 'admin');
                },
            },
            {
                path: 'coin-list',
                component: (resolve) => {
                    require.ensure(['../views/admin/coin-list'], () => {
                        resolve(require('../views/admin/coin-list'));
                    }, 'admin');
                },
            },
            {
                path: 'coin-log',
                component: (resolve) => {
                    require.ensure(['../views/admin/coin-log'], () => {
                        resolve(require('../views/admin/coin-log'));
                    }, 'admin');
                },
            },
            {
                path: 'user-coin-log',
                component: (resolve) => {
                    require.ensure(['../views/admin/user-coin-log'], () => {
                        resolve(require('../views/admin/user-coin-log'));
                    }, 'admin');
                },
            },
            {
                path: 'admin',
                component: (resolve) => {
                    require.ensure(['../views/admin/admin'], () => {
                        resolve(require('../views/admin/admin'));
                    }, 'admin');
                },
            },
            {
                path: 'admin-pay',
                component: (resolve) => {
                    require.ensure(['../views/admin/admin-pay'], () => {
                        resolve(require('../views/admin/admin-pay'));
                    }, 'admin');
                },
            },
            {
                path: 'user',
                component: (resolve) => {
                    require.ensure(['../views/admin/user'], () => {
                        resolve(require('../views/admin/user'));
                    }, 'admin');
                },
            },
            {
                path: 'user-account',
                component: (resolve) => {
                    require.ensure(['../views/admin/user-account'], () => {
                        resolve(require('../views/admin/user-account'));
                    }, 'admin');
                },
            },
            {
                path: 'withdraw-record',
                component: (resolve) => {
                    require.ensure(['../views/admin/withdraw-record'], () => {
                        resolve(require('../views/admin/withdraw-record'));
                    }, 'admin');
                },
            },
            {
                path: 'login-record',
                component: (resolve) => {
                    require.ensure(['../views/admin/login-record'], () => {
                        resolve(require('../views/admin/login-record'));
                    }, 'admin');
                },
            },
            {
                path: 'asset',
                component: (resolve) => {
                    require.ensure(['../views/admin/asset'], () => {
                        resolve(require('../views/admin/asset'));
                    }, 'admin');
                },
            },
            {
                path: 'pay',
                component: (resolve) => {
                    require.ensure(['../views/admin/pay'], () => {
                        resolve(require('../views/admin/pay'));
                    }, 'admin');
                },
            },
            {
                path: 'invest',
                component: (resolve) => {
                    require.ensure(['../views/admin/invest'], () => {
                        resolve(require('../views/admin/invest'));
                    }, 'admin');
                },
            },
            {
                path: 'withdraw',
                component: (resolve) => {
                    require.ensure(['../views/admin/withdraw'], () => {
                        resolve(require('../views/admin/withdraw'));
                    }, 'admin');
                },
            },
            {
                path: 'withdraw/addr',
                component: (resolve) => {
                    require.ensure(['../views/admin/withdraw-addr'], () => {
                        resolve(require('../views/admin/withdraw-addr'));
                    }, 'admin');
                },
            },
            {
                path: 'personal',
                component: (resolve) => {
                    require.ensure(['../views/admin/personal'], () => {
                        resolve(require('../views/admin/personal'));
                    }, 'admin');
                },
                children: [
                    {
                        path: 'info',
                        component: (resolve) => {
                            require.ensure(['../views/admin/personal/info'], () => {
                                resolve(require('../views/admin/personal/info'));
                            }, 'admin');
                        },
                    },
                    {
                        path: 'asset',
                        component: (resolve) => {
                            require.ensure(['../views/admin/personal/asset'], () => {
                                resolve(require('../views/admin/personal/asset'));
                            }, 'admin');
                        },
                    },
                    {
                        path: 'password',
                        component: (resolve) => {
                            require.ensure(['../views/admin/personal/password'], () => {
                                resolve(require('../views/admin/personal/password'));
                            }, 'admin');
                        },
                    },
                ]
            },
            {
                path: 'projects',
                component: (resolve) => {
                    require.ensure(['../views/admin/project'], () => {
                        resolve(require('../views/admin/project'));
                    }, 'admin');
                },
                children: [
                    {
                        path: 'edit',
                        component: (resolve) => {
                            require.ensure(['../views/admin/project/list'], () => {
                                resolve(require('../views/admin/project/list'));
                            }, 'admin');
                        },
                    },
                    {
                        path: 'status',
                        component: (resolve) => {
                            require.ensure(['../views/admin/project/list2'], () => {
                                resolve(require('../views/admin/project/list2'));
                            }, 'admin');
                        },
                    },
                    {
                        path: 'detail',
                        component: (resolve) => {
                            require.ensure(['../views/admin/project/detail'], () => {
                                resolve(require('../views/admin/project/detail'));
                            }, 'admin');
                        },
                    },
                ]
            },
        ],
    },

    {
        path: '*',
        component: (resolve) => {
            require.ensure(['../views/404.vue'], () => {
                resolve(require('../views/404.vue'));
            }, '404');
        }
    },
];

export default routes;
