<template>
    <div class="earn-wrap">
        <h1 class="header-title">入账：</h1>
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
                    cancel-text="取消"
                    @on-change="change">
                </datetime>
            </li>
            <li class="input-item input-required">
                <popup-picker
                    title="入账类型："
                    :data="account_type_arr"
                    v-model="account_type"
                    @on-show="onShow"
                    @on-hide="onHide"
                    @on-change="onChange">
                </popup-picker>
            </li>
            <li class="input-item input-required">
                <x-input v-model="sum_value" title="金额（￥）：" keyboard="number"></x-input>
            </li>
            <li class="input-item">
                <x-input v-model="remarks_value" title="备注："></x-input>
            </li>
        </ul>
        <i class="sure-btn" :class="{'sure-active-true':sum_value}">确认</i>
    </div>
</template>
<script>
    import { PopupPicker, Datetime , Calendar, XInput } from 'vux'
    import Tool from '../../../assets/lib/Tool'
    import types from '../../../store/mutation-types'
    export default {
        name: 'earn',
        components: {
            Calendar,
            Datetime,
            XInput,
            PopupPicker
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
        },
        methods: {
            setNavIndex () {
                this.$store.commit(types.SET_NAV_INDEX,'2')
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

        }
    }
</script>
