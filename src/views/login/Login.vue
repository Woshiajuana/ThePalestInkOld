<template>
    <div class="container-view login-wrap">
        <head-title :title="'登录：'"></head-title>
        <ul class="input-warp">
            <li class="input-item">
                <x-input placeholder="请输入帐号" v-model="name_value" title="帐号：">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user-icon"></use>
                    </svg>
                </x-input>
            </li>
            <li class="input-item">
                <x-input placeholder="请输入密码" v-model="password_value" title="密码：">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password-icon"></use>
                    </svg>
                </x-input>
            </li>
        </ul>
        
        <i class="sure-btn" :class="{'sure-active-true':name_value && password_value}">登录</i>
    </div>
</template>
<script>
    import headTitle from '../../components/head-title.vue'
    import types from '../../store/mutation-types'
    import { XInput } from 'vux'
    export default {
        name: 'login',
        data () {
            return {
                name_value: '',
                password_value: ''
            }
        },
        created () {
            this.$store.commit(types.JUDGE_IS_NOT_FIRST,false);

        },
        components: {
            headTitle,
            XInput
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .login-wrap,.register-wrap{
        @extend %oya;
        .sure-btn.sure-active-true{
            background-color: #58B7FF;
            box-shadow: 0 3px 0 0 #1D8CE0;
        }
    }
    .input-icon{
        @extend %vam;
        width: 25px;
        padding-right: 10px;
        height: 25px;
        fill: #999;
    }
    .input-item{
        div{
            height: 100%;
            background-color: transparent;
        }
    }
</style>
