<template>
    <div class="consumption-wrap">
        <h1 class="header-title">消费：</h1>
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
                    title="消费类型："
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
    import { PopupPicker, Datetime, Calendar, XInput } from 'vux'
    import Tool from '../../../assets/lib/Tool'
    import types from '../../../store/mutation-types'
    export default {
        name: 'consumption',
        created () {
            this.setNavIndex();
        },
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
                account_type_arr: [['水果零食','餐饮伙食', '出行旅游', '网上购物', '生活日常', '租房水电', '医疗药物','其它消费']],
                account_type:['水果零食'],
                date_value: 'TODAY',
                time_value: Tool.format('hh:mm')
            }
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
