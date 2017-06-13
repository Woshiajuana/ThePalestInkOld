<template>
    <div class="earn-wrap">
        <head-title :title="'入账：'"></head-title>
        <ul class="input-warp">
            <li class="input-item input-required">
                <calendar v-model="date_value" title="日期：" disable-future></calendar>
            </li>
            <li class="input-item input-required">
                <datetime
                    title="时间："
                    v-model="time_value"
                    format="HH:mm"
                    confirm-text="完成"
                    cancel-text="取消">
                </datetime>
            </li>
            <li class="input-item input-required">
                <popup-picker
                    title="入账类型："
                    :data="account_type_arr"
                    v-model="account_type">
                </popup-picker>
            </li>
            <li class="input-item input-required">
                <x-input v-model="sum_value" title="金额（￥）：" keyboard="number"></x-input>
            </li>
            <li class="input-item">
                <x-input v-model="remarks_value" title="备注："></x-input>
            </li>
        </ul>
        <i class="sure-btn" @click="subBill()" :class="{'sure-active-true':sum_value}">确认</i>
    </div>
</template>
<script>
    import { PopupPicker, Datetime , Calendar, XInput } from 'vux'
    import headTitle from '../../../components/head-title.vue'
    import Tool from '../../../assets/lib/Tool'
    import Util from '../../../assets/lib/Util'
    import types from '../../../store/mutation-types'
    export default {
        name: 'earn',
        components: {
            Calendar,
            Datetime,
            XInput,
            PopupPicker,
            headTitle
        },
        data () {
            return {
                is_btn_active: false,
                sum_value: '',
                remarks_value: '',
                account_type_arr: [['基本工资', '公司福利', '其它入账']],
                account_type:['基本工资'],
                date_value: 'TODAY',
                time_value: Tool.format('hh:mm')
            }
        },
        created () {
            this.setNavIndex();
            if(this.$route.query.account_type) {
                this.account_type = [this.$route.query.account_type]
            }
        },
        methods: {
            /**提交账单*/
            subBill () {
                if(!this.sum_value) {
                    this.showMsg('请填写入账金额');
                    return;
                }
                if(isNaN(+this.sum_value)) {
                    this.showMsg('入账金额错误');
                    return;
                }
                var bill = {
                    _id: Date.parse(new Date()),
                    sum_value: this.sum_value,
                    date_value: this.date_value,
                    time_value: this.time_value,
                    remarks_value: this.remarks_value,
                    account_type: this.account_type,
                    billTypeNumber: this.billTypeNumber(this.account_type),
                    consumption_or_earn: 1
                };
                Util.Bill.save(bill);
                this.showMsg('记账成功');
                this.resetValue();
            },
            showMsg (msg) {
                this.$vux.toast.show({
                    type: 'text',
                    width: 'auto',
                    text: msg,
                    position: 'top'
                });
            },
            resetValue () {
                this.sum_value = '';
                this.remarks_value = '';
                this.date_value = 'TODAY';
                this.time_value = Tool.format('hh:mm');
            },
            setNavIndex () {
                this.$store.commit(types.SET_NAV_INDEX,'2')
            },
            billTypeNumber ( account_type ) {
                switch (account_type[0]){
                    case '基本工资':
                        account_type = 'jbgz';
                        break;
                    case '公司福利':
                        account_type = 'gsfl';
                        break;
                    case '其它入账':
                        account_type = 'qt';
                        break;
                }
                return account_type;
            }
        }
    }
</script>
