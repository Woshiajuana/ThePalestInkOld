<template>
    <div class="container-view">
        <!--主体内容-->
        <div class="container-box"
            :class="{'open-menu': is_open_menu}">
            <head-title :title="'账单：'"></head-title>
            <svg @click="is_open_menu = !is_open_menu" class="bill-filter">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#filter-icon"></use>
            </svg>
            <!--过滤信息菜单-->
            <div class="filter-menu">
                <head-title :title="'筛选：'"></head-title>
                <ul class="input-warp">
                    <li class="input-item">
                        <datetime
                            title="年："
                            v-model="year_value"
                            format="YYYY"
                            confirm-text="完成"
                            cancel-text="取消">
                        </datetime>
                    </li>
                    <li class="input-item" v-show="year_value">
                        <datetime
                            title="月："
                            v-model="month_value"
                            format="MM"
                            confirm-text="完成"
                            cancel-text="取消">
                        </datetime>
                    </li>
                    <li class="input-item" v-show="month_value">
                        <datetime
                            title="日："
                            v-model="day_value"
                            format="DD"
                            confirm-text="完成"
                            cancel-text="取消">
                        </datetime>
                    </li>
                </ul>
                <div class="menu-type-wrap">
                    <checker
                        v-model="check_value_arr"
                        type="checkbox"
                        default-item-class="bill-type-check-item"
                        selected-item-class="bill-type-check-item-selected">
                        <checker-item :value="'sgls'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-sgls"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'cyhs'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cyhs"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'cxly'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cxly"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'wsgw'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-wsgw"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'shrc'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-shrc"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'cfsd'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-cfsd"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'ylyw'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-ylyw"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'jbgz'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-jbgz"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'gsfl'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-gsfl"></use>
                            </svg>
                        </checker-item>
                        <checker-item :value="'qt'">
                            <svg class="checker-item-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#type-qt"></use>
                            </svg>
                        </checker-item>
                    </checker>
                </div>
                <div class="menu-btn-wrap">
                    <i class="menu-btn menu-sure-btn" @click="filterBill()">确定</i>
                    <i class="menu-btn menu-reset-btn" @click="resetFilter()">重置</i>
                </div>
            </div>
            <!--/过滤信息菜单-->
            <!--账单信息-->
            <div class="bill-wrap">
                <div class="bill-null-warp" v-show="!bill_arr.length">
                    <svg class="bill-list-null-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#null-icon"></use>
                    </svg>
                    <span>没有相关账单</span>
                </div>
                <!--
                          :use-pulldown="true"
                          :use-pullup="true"
                          @on-pulldown-loading="onPullDownLoading"
                          @on-pullup-loading="onPullUpLoading"
                          :pulldown-config="pull_down_config"
                          :pullup-config="pull_up_config"
                -->
                <scroller v-show="bill_arr.length"
                          lock-x
                          height="-118"
                          :scrollbarY="true"
                          @on-scroll="onScroll"
                          ref="billScrollEvent">
                    <ul class="bill-list">
                        <li class="bill-item" v-for="(bill_item,bill_index) in bill_arr">
                            <span class="bill-item-type"
                                :class="{'earn-type': bill_item.consumption_or_earn == 1,
                                 'consumption-type': bill_item.consumption_or_earn == 0}">
                                <a :href="bill_item.consumption_or_earn ? '#/account/earn?account_type=' + bill_item.account_type[0] : '#/account/consumption?account_type=' + bill_item.account_type[0]">
                                    <svg class="bill-item-type-icon">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#type-'+ bill_item.billTypeNumber"></use>
                                    </svg>
                                </a>
                            </span>
                            <p class="bill-item-con">
                                <span class="bill-item-remark" v-text="bill_item.remarks_value || bill_item.account_type[0]"></span>
                                <span class="bill-item-sum" v-text="bill_item.sum_value"></span>
                            </p>
                            <p class="bill-item-time">{{bill_item.consumption_or_earn == 1 ? '入账' : '消费'}}时间：{{bill_item.date_value}} {{bill_item.time_value}}</p>
                            <i class="bill-cancel" @click="confirmRemoveBill(bill_item)">取消</i>
                        </li>
                        <li class="bill-item-null"></li>
                    </ul>
                </scroller>
            </div>
            <!--/账单信息-->
            <!--账单信息提示-->
            <div class="bill-prompt-wrap">
                <div class="bill-prompt">
                    <span class="bill-sum-title">入账</span>
                    <span class="bill-sum bill-sum-earn" id="earn-sum"></span>
                </div>
                <i class="bill-reduce"></i>
                <div class="bill-prompt">
                    <span class="bill-sum-title">消费</span>
                    <span class="bill-sum bill-sum-consumption" id="consumption-sum"></span>
                </div>
                <i class="bill-equal"></i>
                <div class="bill-prompt">
                    <span class="bill-sum-title">余额</span>
                    <span class="bill-sum bill-sum-balance" id="balance-sum"></span>
                </div>
            </div>
            <!--/账单信息提示-->
        </div>
        <!--/主体内容-->
        <!--弹窗提示-->
        <x-dialog v-model="show_dialog" class="dialog-demo" hide-on-blur>
            <div class="dialog-con">
                确定移除该条记录？
            </div>
            <span class="bill-dialog-close"  @click="show_dialog = false"></span>
            <div class="bill-dialog-box" @click="removeBill()">
                <span class="bill-dialog-ok"></span>
            </div>
        </x-dialog>
        <!--/弹窗提示-->
    </div>
</template>
<script>
    import { Scroller, Datetime , Checker, CheckerItem ,XDialog } from 'vux'
    import headTitle from '../../components/head-title.vue'
    import GestureMobile from '../../assets/lib/GestureMobile'
    import Util from '../../assets/lib/Util'
    import CountUp from '../../assets/lib/countUp'
    import Tool from '../../assets/lib/Tool'
    import types from '../../store/mutation-types'
    export default {
        name: 'bill',
        data () {
            return {
                remove_bill: '',
                data_list: [],
                formatDemoValue: ['01', '12'],
                format: function (value, name) {
                    return `${value[0]}:${value[1]}`
                },
                earn_sum: 0,
                consumption_sum: 0,
                bill_arr: [],
                show_dialog: false,
                check_value_arr: '',
                is_btn_active: false,
                day_value: '',
                month_value: '',
                year_value: '',
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
            /**设置导航条状态*/
            this.$store.commit(types.SET_NAV_INDEX,'3');
            /**手势判断*/
            this.gestureMobile();
            /**获取账单列表*/
            this.fetchBillArr();
            /**提示信息*/
            this.countSum();
        },
        components: {
            Scroller,
            Datetime,
            Checker,
            CheckerItem,
            XDialog,
            headTitle
        },
        methods: {
            /**过滤账单*/
            filterBill () {
                var query_condition = {
                    year_value: this.year_value,
                    month_value: this.month_value,
                    day_value: this.day_value,
                    check_value_arr: this.check_value_arr
                };
                this.fetchBillArr(query_condition);
                this.countSum();
                this.is_open_menu = false;
            },
            /**重置删选条件*/
            resetFilter () {
                this.day_value = '';
                this.month_value = '';
                this.year_value = '';
                this.check_value_arr = '';
            },
            /**弹窗对话*/
            confirmRemoveBill (bill) {
                this.show_dialog = true;
                this.remove_bill = bill;
            },
            /**删除账单信息*/
            removeBill () {
                Util.Bill.remove(this.remove_bill);
                this.fetchBillArr();
                var earn_sum = this.earn_sum,
                    consumption_sum = this.consumption_sum;
                if (this.remove_bill.consumption_or_earn == 0){
                    this.consumption_sum = this.consumption_sum - this.remove_bill.sum_value;
                } else {
                    this.earn_sum = this.earn_sum - this.remove_bill.sum_value;
                }
                this.$nextTick(() => {
                    new CountUp("earn-sum", earn_sum, this.earn_sum, 2, 2).start();
                    new CountUp("consumption-sum", consumption_sum, this.consumption_sum, 2, 2).start();
                    new CountUp("balance-sum", (earn_sum - consumption_sum), (this.earn_sum - this.consumption_sum), 2, 2).start();
                });
                this.show_dialog = false;
            },
            /**获取账单信息*/
            fetchBillArr (query_condition) {
                this.bill_arr = Util.Bill.query(query_condition);
                this.$nextTick(() => {
                    this.$refs.billScrollEvent.reset();
                });
            },
            /**提示信息*/
            showMsg (msg) {
                this.$vux.toast.show({
                    type: 'text',
                    width: 'auto',
                    text: msg,
                    position: 'top'
                })
            },
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
            /**计算金额*/
            countSum () {
                var earn_sum = this.earn_sum,
                    consumption_sum = this.consumption_sum;
                this.earn_sum = 0;
                this.consumption_sum = 0;
                this.bill_arr.forEach((item,index) => {
                    if(item.consumption_or_earn == 1)
                        this.earn_sum =  this.earn_sum + (+item.sum_value);
                    else
                        this.consumption_sum =  this.consumption_sum + (+item.sum_value);
                });
                this.$nextTick(() => {
                    new CountUp("earn-sum", earn_sum, this.earn_sum, 2, 2).start();
                    new CountUp("consumption-sum", consumption_sum, this.consumption_sum, 2, 2).start();
                    new CountUp("balance-sum", (earn_sum-consumption_sum), (this.earn_sum - this.consumption_sum), 2, 2).start();
                });
            },
            onScroll (pos) {
                this.scrollTop = pos.top;
            },
            onPullDownLoading () {
                this.$nextTick(() => {
                    this.$refs.billScrollEvent.reset();
                    this.$refs.billScrollEvent.donePulldown();
                });
            },
            onPullUpLoading () {
                this.$nextTick(() => {
                    this.$refs.billScrollEvent.reset();
                    this.$refs.billScrollEvent.donePullup();
                })
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .menu-type-wrap{
        @extend %clearfix;
        margin-top: 10px;
    }
    .bill-null-warp{
        @extend %pa;
        @extend %c9;
        @extend %l0;
        @extend %tac;
        @extend %r0;
        padding-top: 100px;
    }
    .bill-list-null-icon{
        @extend %db;
        @extend %ma;
        width: 100px;
        height: 50px;
        fill: #999;
    }
    .dialog-con{
        padding: 20px 0;
    }
    .bill-dialog-box{
        background-color: #F9FAFC;
    }
    .bill-dialog-close{
        @extend %pa;
        top: 8px;
        right: 8px;
        width: 15px;
        height: 15px;
        &:after,
        &:before{
            content: '';
            @extend %pa;
            @extend %l0;
            top: 7px;
            width: 15px;
            height: 1px;
            background-color: #999;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        &:after{
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }
    .bill-dialog-ok{
        @extend %pr;
        @extend %dib;
        @extend %vam;
        @extend %c9;
        margin: 8px 0;
        width: 24px;
        height: 24px;
        &:after,
        &:before{
            content: '';
            @extend %pa;
            @extend %l0;
            top: 7px;
            height: 1px;
            background-color: #58B7FF;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        &:after{
            left: -5px;
            top: 13px;
            width: 13px;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        &:before{
            width: 24px;
            top: 9px;
            left: 2px;
        }
    }
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
        @extend %t50;
        @extend %l50;
        width: 30px;
        height: 30px;
        margin-top: -15px;
        margin-left: -15px;
        fill: #ccc;
        transition: all .5s;
    }
    .bill-wrap{
        @extend %oya;
        @extend %pa;
        @extend %w100;
        @extend %b0;
        top: 64px;
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
            @extend %pa;
            @extend %l0;
            @extend %t0;
            @extend %b0;
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
        @extend %b0;
        @extend %l0;
        @extend %r0;
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
    .bill-item-null{
        padding: 20px 0;
    }
    .bill-item-type{
        @extend %pa;
        @extend %t50;
        left: -50px;
        width: 50px;
        height: 50px;
        margin-top: -25px;
        &.earn-type{
            .bill-item-type-icon{
                fill: #13CE66;
            }
        }
        &.consumption-type{
            .bill-item-type-icon {
                fill: #FF4949;
            }
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
