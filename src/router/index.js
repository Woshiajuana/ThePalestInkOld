import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        /**首页*/
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
})
