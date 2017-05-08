/**
 * vuex数据控制中心
 * */
import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types.js'
Vue.use(Vuex);

/**
 * 数据存储
 * */
const state = {
    is_not_first: true,
    animate_name: 'vux-pop-in',
    nav_index: 1
};

/**
 * 模块
 * */
const modules = {

};

/**
 * 提交同步请求
 * */
const mutations = {
    /**全局判断是否是第一次进入*/
    [ types.JUDGE_IS_NOT_FIRST ] (state,is_not_first) {
        state.is_not_first = is_not_first;
    },
    /**全局判断前进回退的动画*/
    [ types.SET_ANIMATE_NAME ] (state,animate_name) {
        state.animate_name = animate_name;
    },
    /**判断菜单栏选择情况*/
    [ types.SET_NAV_INDEX ] (state,nav_index) {
        state.nav_index = nav_index;
    }
};

export default new Vuex.Store({
    state,
    modules,
    mutations
})
