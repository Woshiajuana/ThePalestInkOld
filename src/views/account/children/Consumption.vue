<template>
    <div class="container-view account-wrap">
        <h1 class="header-title">消费：</h1>
        <ul class="input-warp">
            <li class="input-item">
                <calendar v-model="date_value" title="日期：" disable-past></calendar>
            </li>
            <li class="input-item">
                <datetime
                    title="时间："
                    v-model="time_value"
                    format="HH:mm"
                    confirm-text="完成"
                    cancel-text="取消"
                    @on-change="change">
                </datetime>
            </li>
            <li class="input-item">
                <popup-picker
                    title="消费类型："
                    :data="account_type_arr"
                    v-model="account_type"
                    @on-show="onShow"
                    @on-hide="onHide"
                    @on-change="onChange">
                </popup-picker>
            </li>
            <li class="input-item">
                <x-input title="金额（￥）：" keyboard="number"></x-input>
            </li>
            <li class="input-item">
                <x-input title="备注："></x-input>
            </li>
        </ul>
    </div>
</template>
<script>
    import { PopupPicker, Datetime, Calendar, XInput } from 'vux'
    export default {
        name: 'account',
        components: {
            Calendar,
            Datetime,
            XInput,
            PopupPicker
        },
        data () {
            return {
                account_type_arr: [['水果零食', '出行旅游', '网上购物', '生活日常', '房屋水电', '医疗药物','其它消费']],
                account_type:['水果零食'],
                date_value: '2016-08-18',
                time_value: '18:41'
            }
        },
        methods: {
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
