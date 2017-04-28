import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import './assets/lib/flexible.js'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
