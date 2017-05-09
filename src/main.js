import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index.js'
import './assets/lib/flexible.js'
import './assets/lib/Chart'
import Util from './assets/lib/Util'
import  { ToastPlugin } from 'vux'

/**使用vux的插件提示功能*/
Vue.use(ToastPlugin);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/**
 * ajax请求头附带用户token传递给后台服务器进行用户验证
 * 这里的config包含每次请求的内容
 * */
// axios.interceptors.request.use(function (config) {
//     let token = Util.dataToSessionStorageOperate.achieve('token');
//     if (token) {
//         config.headers.Authorization = `${token}`;
//     }
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// });

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
