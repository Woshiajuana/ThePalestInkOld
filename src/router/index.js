import Vue from 'vue'
import Router from 'vue-router'

import Guide from '../views/guide/Guide.vue'
import Home from '../views/home/Home.vue'
import Account from '../views/account/Account.vue'
import AccountIndex from '../views/account/children/AccountIndex.vue'
import Consumption from '../views/account/children/Consumption.vue'
import Earn from '../views/account/children/Earn.vue'
import Bill from '../views/bill/Bill.vue'
import Chart from '../views/chart/Chart.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/register/Register.vue'
import Error from '../views/error/Error.vue'
import Agreement from '../views/agreement/Agreement.vue'
import Modify from '../views/modify/Modify.vue'
import Retrieve from '../views/retrieve/Retrieve.vue'

import Tool from '../assets/lib/Tool'

Vue.use(Router);

const router = new Router({
    routes: [
        /**引导页*/
        {
            path: '/guide',
            name: 'guide',
            component: Guide,
            meta: {
                status: 0
            }
        },
        /**登录页*/
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                status: 1
            }
        },
        /**注册页*/
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                status: 2
            }
        },
        /**首页*/
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                status: 3
            }
        },
        /**记账*/
        {
            path: '/account',
            name: 'account',
            component: Account,
            meta: {
                status: 4
            },
            children: [
                {
                    path: '',
                    name: 'account_index',
                    component: AccountIndex,
                    meta: {
                        status: 5
                    }
                },
                {
                    path: 'consumption',
                    name: 'consumption',
                    component: Consumption,
                    meta: {
                        status: 6
                    }
                },
                {
                    path: 'earn',
                    name: 'earn',
                    component: Earn,
                    meta: {
                        status: 6
                    }
                }
            ]
        },
        /**账单页面*/
        {
            path: '/bill',
            name: 'bill',
            component: Bill,
            meta: {
                status: 7
            }
        },
        /**分析页面*/
        {
            path: '/chart',
            name: 'chart',
            component: Chart,
            meta: {
                status: 8
            }
        },
        /**找回密码页面*/
        {
            path: '/retrieve',
            name: 'retrieve',
            component: Retrieve,
            meta: {
                status: 9
            }
        },
        /**修改密码*/
        {
            path: '/modify',
            name: 'modify',
            component: Modify,
            meta: {
                status: 9
            }
        },
        /**协议页面*/
        {
            path: '/agreement',
            name: 'agreement',
            component: Agreement,
            meta: {
                status: 998
            }
        },
        /**异常错误页*/
        {
            path: '/error',
            name: 'error',
            component: Error,
            meta: {
                status: 999
            }
        }
    ]
});

/**
 * 判断用户是否第一次打开APP，是否启动引导页面
 * 判断用户是否登录应用
 * 设置路由之间的跳转动画
 * */
router.beforeEach( (to, from, next) => {
    /**获取仓库数据*/
    let store = this.a.app.$store;
    if(store){
        /**判断页面切换动画*/
        if(from.meta.status > to.meta.status) store.commit('SET_ANIMATE_NAME','vux-pop-out');
        else store.commit('SET_ANIMATE_NAME','vux-pop-in');
    }
    /**获取用户是否第一次进入应用的状态*/
    let is_not_first = Tool.dataToLocalStorageOperate.achieve('is_not_first');
    /**获取用户是否已经登录的状态*/
    let user = Tool.dataToSessionStorageOperate.achieve('user');
    console.log(2)
    if ( !is_not_first && to.path != '/guide' ) {
        /**用户第一次进入且路径跳转不是为引导页的时候，跳转到引导页*/
        console.log(3)
        next('/guide');
    } else if ( is_not_first && !user && to.path != '/login' && to.path != '/register' && to.path != '/agreement' && to.path != '/retrieve') {
        console.log(4)
        /**用户没有登录，且用户跳转的路径不是登录页也不能是注册页的时候*/
        next('/login');
    } else if ( is_not_first && user && (to.path == '/login' || to.path == '/register')) {
        console.log(6)
        /**用户已经登录，且跳转的页面是登录页或者注册页的时候*/
        next('/')
    } else if( is_not_first && to.path == '/guide' ) {
        console.log(7)
        /**用户不是第一次进入且跳转路径为引导页的时候*/
        next('/');
    } else next();
});

export default router;
