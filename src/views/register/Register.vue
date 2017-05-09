<template>
    <div class="container-view register-wrap">
        <head-title :title="'注册：'"></head-title>
        <ul class="input-warp">
            <li class="input-item input-required">
                <x-input :max="6"
                         @on-change="checkUserName()"
                         :debounce="1000"
                         :is-type="checkUser"
                         placeholder="请输入帐号" v-model="name_value" title="帐号：">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user-icon"></use>
                    </svg>
                </x-input>
            </li>
            <li class="input-item input-required">
                <x-input type="password" placeholder="请输入6位密码" :min="6" :max="6" v-model="password_value" title="密码：">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password-icon"></use>
                    </svg>
                </x-input>
            </li>
            <li class="input-item input-required">
                <x-input type="password" placeholder="请确认密码" :min="6" :max="6" v-model="too_password_value" title="确认密码：">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password-icon"></use>
                    </svg>
                </x-input>
            </li>
        </ul>
        <p class="agreement-prompt">
            点击「注册」按钮，即代表你同意<a href="#/agreement">《浪笔头协议》</a>
        </p>
        <i class="sure-btn" :class="{'sure-active-true':name_value && password_value && too_password_value == password_value}">注册</i>
        <a href="#/login" class="user-link">已有帐号？点我去登录</a>
    </div>
</template>
<script>
    import headTitle from '../../components/head-title.vue'
    import types from '../../store/mutation-types'
    import { XInput } from 'vux'
    export default {
        name: 'register',
        data () {
            return {
                name_value: '',
                password_value: '',
                too_password_value: ''
            }
        },
        created () {
            this.$store.commit(types.JUDGE_IS_NOT_FIRST,false);
        },
        components: {
            headTitle,
            XInput
        },
        methods: {
            checkUserName () {
                console.log(12)
            },
            checkUser (value) {
                return {
                    valid: false,
                    msg: 'Must be 2333'
                }
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .agreement-prompt{
        @extend %c9;
        @extend %f12;
        margin: 20px;
        a{
            @extend %fwb;
            color: #58B7FF;
        }
    }
</style>

