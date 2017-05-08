<template>
    <div class="container-view">
        <div class="home-wrap"
            :class="{'home-active': is_open}">
            <div class="balance-wrap">
                <svg slot="icon" class="balance-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-jbgz"></use>
                </svg>
                <h2 class="balance-title">可用余额</h2>
                <h1 class="balance-total" id="total_balance"></h1>
            </div>
            <div class="home-btn-wrap">
                <a href="#/account/consumption" class="go-account go-consumption">消费</a>
                <a href="#/account/earn" class="go-account go-earn">入账</a>
                <!--<span class="home-btn-item">本月可用余额</span>-->
                <!--<span class="home-btn-item">实施计划经济</span>-->
            </div>
            <svg @click="is_open = true" slot="icon" class="home-arrow" v-show="!is_open">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nav-arrow"></use>
            </svg>
        </div>
    </div>
</template>
<script>
    import { Scroller } from 'vux'
    import GestureMobile from '../../assets/lib/GestureMobile'
    import types from '../../store/mutation-types'
    import CountUp from '../../assets/lib/countUp'
    import Util from '../../assets/lib/Util'
    export default {
        name: 'home',
        data: function () {
            return {
                is_open: false,
                total_balance: 0
            }
        },
        components:{
            Scroller,
        },
        created () {
            this.gestureMobile();
            this.setNavIndex();
            this.fetchBalance();
        },
        methods: {
            /**手势*/
            gestureMobile () {
                this.$nextTick(() => {
                    let _this = this;
                    GestureMobile(this.$el,{
                        upCallBackFun () {
                            _this.is_open = true;
                        },
                        downCallBackFun () {
                            _this.is_open = false;
                        }
                    });
                })
            },
            /**获取可用余额*/
            fetchBalance () {
                this.total_balance = Util.TotalBalance.query();
                this.$nextTick(() => {
                    new CountUp("total_balance", 0, this.total_balance, 2, 2).start();
                })
            },
            /**设置导航条按钮状态*/
            setNavIndex () {
                this.$store.commit(types.SET_NAV_INDEX,'1')
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .home-active{
        .balance-wrap{
            top: 35%;
        }
        .home-btn-wrap{
            bottom: 15%;
            opacity: 1;
        }
    }
    .balance-wrap{
        @extend %pa;
        @extend %oh;
        @extend %l50;
        @extend %t50;
        width: 60%;
        transition: all 1s;
        transform: translate3d(-50%,-50%,0);
        padding-bottom: 60%;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid rgb(224, 230, 237)
    }
    .balance-title{
        @extend %pa;
        @extend %f12;
        @extend %fwn;
        @extend %tac;
        @extend %l0;
        @extend %r0;
        color: #999;
        top: 30%;
    }
    .balance-total{
        @extend %pa;
        @extend %fwn;
        @extend %tac;
        @extend %l0;
        @extend %r0;
        @extend %t50;
        height: 48px;
        margin-top: -24px;
        line-height: 48px;
        font-size: 24px;
        color: #58B7FF;
        &:after{
            @extend %pa;
            @extend %f12;
            @extend %b0;
            line-height: 42px;
            content: '(￥)';
            color: #999;
        }
    }
    .balance-icon{
        @extend %pa;
        top: 25%;
        left: 25%;
        width: 50%;
        height: 50%;
        fill: #ddd;
    }
    .home-btn-wrap{
        @extend %pa;
        @extend %r0;
        @extend %l0;
        @extend %tac;
        @extend %f14;
        @extend %cfff;
        opacity: 0;
        transition: all .5s;
        bottom: -30%;
    }
    .home-btn-item{
        @extend %db;
        @extend %cp;
        @extend %cfff;
        margin: 20px auto 0;
        width: 120px;
        height: 32px;
        line-height: 32px;
        background-color: #58B7FF;
        border-radius: 5px;
        box-shadow: 0 3px 0 0 #1D8CE0;
    }
    .home-arrow{
        @extend %pa;
        @extend %l50;
        margin-left: -10px;
        bottom: 20px;
        width: 20px;
        height: 20px;
        fill: #999;
        animation: arrow-animate 2s ease-in-out infinite;
    }
    @keyframes arrow-animate {
        0%{
            bottom: 10px;
        }
        50%{
            bottom: 20px;
        }
        100%{
            bottom: 10px;
        }
    }
</style>
