<template>
    <div id="app">
        <!--主体内容视图-->
        <transition :name="animateName">
            <!--<keep-alive>-->
                <router-view></router-view>
            <!--</keep-alive>-->
        </transition>
        <!--/主体内容视图-->

        <!--导航条-->
        <tabbar v-if="isNotFirst">
            <tabbar-item :selected="navIndex == 1" link="/">
                <svg slot="icon" class="nav-item nav-home-item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nav-home"></use>
                </svg>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :selected="navIndex == 2" link="/account">
                <svg slot="icon" class="nav-item nav-account-item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nav-account"></use>
                </svg>
                <span slot="label">记账</span>
            </tabbar-item>
            <tabbar-item :selected="navIndex == 3" link="/bill">
                <svg slot="icon" class="nav-item nav-bill-item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nav-bill"></use>
                </svg>
                <span slot="label">账单</span>
            </tabbar-item>
            <tabbar-item :selected="navIndex == 4" link="/chart">
                <svg slot="icon" class="nav-item nav-chart-item">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nav-chart"></use>
                </svg>
                <span slot="label">分析</span>
            </tabbar-item>
        </tabbar>
        <!--/导航条-->

        <!--svg-->
        <svg-template></svg-template>
        <!--/svg-->
    </div>
</template>

<script>
    import SvgTemplate from './components/svg-template.vue'
    import { Tabbar, TabbarItem } from 'vux'
    export default {
        name: 'app',
        computed: {
            animateName () {
                return this.$store.state.animate_name;
            },
            navIndex () {
                return this.$store.state.nav_index;
            },
            isNotFirst () {
                return this.$store.state.is_not_first;
            }
        },
        components: {
            SvgTemplate,
            Tabbar,
            TabbarItem
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/reset";
    @import "./assets/scss/define";
    body{
        @extend %oh;
        background-color: #F9FAFC;
    }
    .home-wrap,
    .container-view{
        @extend %pa;
        @extend %t0;
        @extend %l0;
        @extend %r0;
        @extend %oh;
        bottom: 54px;
        background-color: #F9FAFC;
    }
    .home-wrap{
        bottom: 0;
    }
    .nav-item{
        fill: #999;
        &.nav-home-item{
            width: 27px;
            height: 27px;
        }
        &.nav-account-item{
            margin-top: 4px;
            width: 20px;
            height: 20px;
        }
        &.nav-bill-item{
            margin-top: 3px;
            width: 22px;
            height: 22px;
        }
        &.nav-chart-item{
            margin-top: 5px;
            width: 23px;
            height: 23px;
        }
    }
    .weui-tabbar__item{
        span{
            color: #999 !important;
        }
    }
    .weui-bar__item_on{
        .nav-item{
            fill: #58B7FF;
        }
        span{
            padding: 0 3px;
            border-radius: 5px;
            color: #fff !important;
            background-color: #58B7FF;
        }
    }
    .vux-pop-in-enter-active,.vux-pop-in-leave-active,.vux-pop-out-enter-active,.vux-pop-out-leave-active {
        will-change: transform;
        -webkit-transition: all .5s;
        transition: all .5s;
        position: absolute;
        top: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-perspective: 1000px;
        perspective: 1000px;
    }
    .vux-pop-out-enter {
        opacity: 0;
        -webkit-transform: translate3d(-100%,0,0);
        transform: translate3d(-100%,0,0)
    }
    .vux-pop-in-enter,.vux-pop-out-leave-active {
        opacity: 0;
        -webkit-transform: translate3d(100%,0,0);
        transform: translate3d(100%,0,0)
    }
    .vux-pop-in-leave-active {
        opacity: 0;
        -webkit-transform: translate3d(-100%,0,0);
        transform: translate3d(-100%,0,0)
    }
    .weui-toast__content{
        font-size: 12px !important;
        padding: 10px 5px !important;
    }
</style>
