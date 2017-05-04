<template>
    <div class="container-view">
        <div class="container-box"
            :class="{'open-menu': is_open_menu}">
            <h1 class="header-title">账单：</h1>
            <svg @click="is_open_menu=!is_open_menu" slot="icon" class="bill-filter">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#filter-icon"></use>
            </svg>
            <div class="filter-menu">
                <h2 class="header-title">筛选：</h2>
                <ul class="input-warp">
                    <li class="input-item">
                        <datetime
                            title="年："
                            v-model="year_value"
                            format="YYYY"
                            confirm-text="完成"
                            cancel-text="取消"
                            @on-change="change">
                        </datetime>
                    </li>
                    <li class="input-item">
                        <datetime
                            title="月："
                            v-model="month_value"
                            format="MM"
                            confirm-text="完成"
                            cancel-text="取消"
                            @on-change="change">
                        </datetime>
                    </li>
                    <li class="input-item">
                        <datetime
                            title="日："
                            v-model="day_value"
                            format="DD"
                            confirm-text="完成"
                            cancel-text="取消"
                            @on-change="change">
                        </datetime>
                    </li>
                </ul>
                <div class="menu-type-wrap">
                    <checker
                        v-model="demo1Checkbox"
                        type="checkbox"
                        default-item-class="bill-type-check-item"
                        selected-item-class="bill-type-check-item-selected">
                        <checker-item :value="1">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-sgls"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="2">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cyhs"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="3">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cxly"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="4">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-wsgw"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="5">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-shrc"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="6">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cfsd"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="7">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-ylyw"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="8">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-jbgz"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="9">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-gsfl"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="10">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-qt"></use>
                            </svg>
                        </checker-item>
                    </checker>
                </div>
                <div class="menu-btn-wrap">
                    <i class="menu-btn menu-sure-btn">确定</i>
                    <i class="menu-btn menu-reset-btn">重置</i>
                </div>
            </div>
            <div class="bill-wrap">
                <scroller lock-x
                          height="-118"
                          :scrollbarY="true"
                          @on-scroll="onScroll"
                          :use-pulldown="true"
                          :use-pullup="true"
                          @on-pulldown-loading="onPullDownLoading"
                          @on-pullup-loading="onPullUpLoading"
                          :pulldown-config="pull_down_config"
                          :pullup-config="pull_up_config"
                          ref="homeScrollEvent">
                    <ul class="bill-list">
                        <li class="bill-item">
                            <span class="bill-item-type consumption-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-sgls"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">水果零食</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">消费时间：2017-05-03 17：18</p>
                            <i class="bill-cancel">取消</i>
                        </li>
                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cyhs"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">餐饮伙食</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">消费时间：2017-05-03 17：18</p>
                        </li>
                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-wsgw"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">网上购物</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">消费时间：2017-05-03 17：18</p>
                        </li>
                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-shrc"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">生活日常</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">消费时间：2017-05-03 17：18</p>
                        </li>
                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cfsd"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">租房水电</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">消费时间：2017-05-03 17：18</p>
                        </li>
                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-ylyw"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">医疗药物</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">消费时间：2017-05-03 17：18</p>
                        </li>
                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-qt"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">其它消费</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">消费时间：2017-05-03 17：18</p>
                        </li>

                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-jbgz"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">基本工资</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">入账时间：2017-05-03 17：18</p>
                        </li>
                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-gsfl"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">公司福利</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">入账时间：2017-05-03 17：18</p>
                        </li>
                        <li class="bill-item">
                            <span class="bill-item-type earn-type">
                                <svg class="bill-item-type-icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-qt"></use>
                                </svg>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">其它入账</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">入账时间：2017-05-03 17：18</p>
                        </li>
                    </ul>
                </scroller>
            </div>
            <div class="bill-prompt-wrap">
                <div class="bill-prompt">
                    <span class="bill-sum-title">入账</span>
                    <span class="bill-sum bill-sum-earn">5000.00</span>
                </div>
                <i class="bill-reduce"></i>
                <div class="bill-prompt">
                    <span class="bill-sum-title">消费</span>
                    <span class="bill-sum bill-sum-consumption">5000.00</span>
                </div>
                <i class="bill-equal"></i>
                <div class="bill-prompt">
                    <span class="bill-sum-title">余额</span>
                    <span class="bill-sum bill-sum-balance">5000.00</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Scroller, Datetime , Checker, CheckerItem } from 'vux'
    import GestureMobile from '../../assets/lib/GestureMobile'
    import Tool from '../../assets/lib/Tool'
    import types from '../../store/mutation-types'
    export default {
        name: 'bill',
        data () {
            return {
                demo1Checkbox: [2, 1],
                is_btn_active: false,
                day_value: Tool.format('dd'),
                month_value: Tool.format('MM'),
                year_value: Tool.format('yyyy'),
                is_open_menu: false,
                pull_down_config: {
                    content: '下拉刷新',
                    height: 60,
                    autoRefresh: false,
                    downContent: '拉人家干嘛~~~',
                    upContent: '疼~还不松开人家',
                    loadingContent: 'Loading...',
                    clsPrefix: 'xs-plugin-pulldown-'
                },
                pull_up_config: {
                    content: '上拉加载',
                    pullUpHeight: 60,
                    height: 40,
                    autoRefresh: false,
                    downContent: '疼~还不松开人家',
                    upContent: '拉人家干嘛~~~',
                    loadingContent: 'Loading...',
                    clsPrefix: 'xs-plugin-pullup-'
                }
            }
        },
        created () {
            this.$store.commit(types.SET_NAV_INDEX,'3');
            this.gestureMobile();
        },
        components: {
            Scroller,
            Datetime,
            Checker,
            CheckerItem
        },
        methods: {
            /**手势判断*/
            gestureMobile () {
                this.$nextTick(() => {
                    let _this = this;
                    GestureMobile(this.$el,{
                        leftCallBackFun () {
                            _this.is_open_menu = true;
                        },
                        rightCallBackFun () {
                            _this.is_open_menu = false;
                        }
                    });
                })
            },
            change (value) {
                console.log('change', value)
            },
            onShow () {
                console.log('on show')
            },
            onHide (type) {
                console.log('on hide', type)
            },
            onChange (val) {
                console.log('val change', val)
            },
            onScroll (pos) {
                this.scrollTop = pos.top;
            },
            onPullDownLoading () {
                this.$nextTick(() => {
                    this.$refs.homeScrollEvent.reset();
                    this.$refs.homeScrollEvent.donePulldown();
                });
            },
            onPullUpLoading () {
                this.$nextTick(() => {
                    this.$refs.homeScrollEvent.reset();
                    this.$refs.homeScrollEvent.donePullup();
                })
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .bill-reduce,
    .bill-equal{
        width: 12px;
        margin: 0 4px;
    }
    .bill-sum-title{
        @extend %pa;
        @extend %f12;
        @extend %tac;
        @extend %r0;
        @extend %l0;
        top: 3px;
        color: #58B7FF;
    }
    .bill-sum-earn{
        color: #F7BA2A;
    }
    .bill-sum-consumption{
        color: #FF4949;
    }
    .bill-sum-balance{
        color: #13CE66;
    }
    .bill-reduce{
        height: 2px;
        margin-top: 22px;
        background-color: #58B7FF;
    }
    .bill-equal{
        height: 6px;
        margin-top: 18px;
        border-bottom: 2px solid #58B7FF;
        border-top: 2px solid #58B7FF;
    }
    .bill-prompt-wrap{
        @extend %pa;
        @extend %b0;
        @extend %r0;
        @extend %l0;
        @extend %df;
        height: 40px;
        background-color: rgba(255,255,255,.8);
    }
    .bill-sum{
        @extend %fwb;
        line-height: 35px;
    }
    .bill-prompt{
        @extend %df1;
        @extend %f16;
        @extend %tac;
        @extend %pr;
        padding-top: 10px;
    }
    .bill-cancel{
        @extend %pa;
        @extend %f12;
        @extend %cfff;
        @extend %cp;
        padding: 0 5px;
        right: 10px;
        bottom: 12px;
        background-color: #FF4949;
        border-radius: 5px;
    }
    .bill-type-check-item{
        @extend %pr;
        @extend %fl;
        width: 20%;
        padding-bottom: 20%;
        &.bill-type-check-item-selected{
            .checker-item-icon{
                fill: #58B7FF;
            }
        }
    }
    .checker-item-icon{
        @extend %pa;
        top: 20%;
        left: 20%;
        width: 60%;
        height: 60%;
        fill: #ccc;
        transition: all .5s;
    }
    .bill-wrap{
        @extend %oya;
        @extend %pa;
        @extend %w100;
        top: 64px;
        bottom: 0;
    }
    .bill-filter{
        @extend %pa;
        @extend %cp;
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
        fill: #999;
    }
    .container-box{
        @extend %h100;
        transition: all .5s;
        &.open-menu{
            transform: translate3d(-82%,0,0);
        }
    }
    .filter-menu{
        @extend %pa;
        @extend %t0;
        @extend %r0;
        @extend %b0;
        transition: all .5s;
        transform: translate3d(100%,0,0);
        width: 82%;
        z-index: 1;
        background-color: #fff;
        &:before{
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: #999;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
        }
    }
    .filter-menu-item{
        @extend %db;
        @extend %f12;
        @extend %cp;
        padding-left: 10px;
        line-height: 30px;
    }
    .menu-btn-wrap{
        @extend %pa;
        @extend %df;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .menu-btn{
        @extend %df1;
        @extend %f14;
        @extend %tac;
        @extend %cfff;
        @extend %cp;
        height: 40px;
        line-height: 40px;
    }
    .menu-sure-btn{
        background-color: #58B7FF;
    }
    .menu-reset-btn{
        background-color: #ccc;
    }
    .bill-list{
        margin: 0 10px 20px;
    }
    .bill-item{
        @extend %pr;
        margin-left: 50px;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        &:last-child{
            border-bottom: none;
        }
    }
    .bill-item-type{
        @extend %pa;
        @extend %t50;
        left: -50px;
        width: 50px;
        height: 50px;
        margin-top: -25px;
        &.earn-type{
            fill: #13CE66;
        }
        &.consumption-type{
            fill: #FF4949;
        }
    }
    .bill-item-type-icon{
        @extend %pa;
        @extend %t50;
        @extend %l50;
        width: 30px;
        height: 30px;
        margin-top: -15px;
        margin-left: -15px;
    }
    .bill-item-con{
        @extend %f14;
        @extend %fwb;
        @extend %oh;
        @extend %c3;
        line-height: 30px;
    }
    .bill-item-remark{
        @extend %fl;
    }
    .bill-item-sum{
        @extend %fr;
        @extend %pr;
        padding-right: 20px;
        &:after{
            @extend %pa;
            @extend %r0;
            content: '￥';
        }
    }
    .bill-item-time{
        @extend %oh;
        @extend %tar;
        @extend %f12;
        @extend %c9;
        margin-right: 40px;
        height: 20px;
        line-height: 20px;
    }
</style>
