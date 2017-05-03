<template>
    <div class="container-view">
        <div class="container-box"
            :class="{'open-menu': is_open_menu}">
            <h1 class="header-title">账单：</h1>
            <svg @click="is_open_menu=!is_open_menu" slot="icon" class="bill-filter">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#filter-icon"></use>
            </svg>
            <div class="filter-menu">
                <a href="#/" class="filter-menu-item">水果零食</a>
                <a href="#/" class="filter-menu-item">餐饮伙食</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
                <a href="#/" class="filter-menu-item">出行旅游</a>
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
                            <svg slot="icon" class="bill-item-type-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-sgls"></use>
                            </svg>
                        </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark">水果零食</span>
                                <span class="bill-item-sum">50.00</span>
                            </p>
                            <p class="bill-item-time">消费时间：2017-05-03 17：18</p>
                        </li>
                        <li class="bill-item">
                        <span class="bill-item-type earn-type">
                            <svg slot="icon" class="bill-item-type-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cshs"></use>
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
                            <svg slot="icon" class="bill-item-type-icon">
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
                            <svg slot="icon" class="bill-item-type-icon">
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
                            <svg slot="icon" class="bill-item-type-icon">
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
                            <svg slot="icon" class="bill-item-type-icon">
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
                            <svg slot="icon" class="bill-item-type-icon">
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
                            <svg slot="icon" class="bill-item-type-icon">
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
                            <svg slot="icon" class="bill-item-type-icon">
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
                            <svg slot="icon" class="bill-item-type-icon">
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
        </div>
    </div>
</template>
<script>
    import { Calendar, Scroller } from 'vux'
    import types from '../../store/mutation-types'
    export default {
        name: 'bill',
        data () {
            return {
                is_open_menu: false,
                date_value: '',
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
        },
        components: {
            Calendar,
            Scroller
        },
        methods: {
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
    .filter-menu-item{
        @extend %db;
        @extend %f12;
        @extend %cp;
        padding-left: 10px;
        line-height: 30px;
    }
    .container-box{
        @extend %h100;
        transition: all .5s;
        &.open-menu{
            transform: translate3d(-80%,0,0);
        }
    }
    .filter-menu{
        @extend %pa;
        @extend %t0;
        @extend %r0;
        @extend %b0;
        transition: all .5s;
        transform: translate3d(100%,0,0);
        width: 90%;
        z-index: 1;
        border-left: 1px solid #ddd;
        background-color: #fff;
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
        height: 20px;
        line-height: 20px;
    }
</style>
