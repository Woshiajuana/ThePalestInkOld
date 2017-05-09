<template>
    <div class="container-view register-wrap">
        <head-title :title="'注册：'"></head-title>
        <ul class="input-warp">
            <li class="input-item input-required"
                :class="{'input-error':is_repeat && name_value}">
                <x-input :min="1"
                         :max="12"
                         @on-change="checkUserName()"
                         :debounce="1000"
                         novalidate
                         placeholder="请输入帐号" v-model="name_value" title="帐号：">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user-icon"></use>
                    </svg>
                </x-input>
            </li>
            <li class="input-item input-required"
                :class="{ 'input-error': password_value.length != 6 && password_value.length != 0}">
                <x-input novalidate type="password" placeholder="请输入6位密码" :min="6" :max="6" v-model="password_value" title="密码：">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password-icon"></use>
                    </svg>
                </x-input>
            </li>
            <li class="input-item input-required"
                :class="{ 'input-error': too_password_value && ( password_value != too_password_value ) }">
                <x-input novalidate type="password" placeholder="请确认密码" :min="6" :max="6" v-model="too_password_value" title="确认密码：">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password-icon"></use>
                    </svg>
                </x-input>
            </li>
        </ul>
        <p class="agreement-prompt">
            点击「注册」按钮，即代表你同意<a href="#/agreement">《浪笔头协议》</a>
        </p>
        <i class="sure-btn" @click="register()" :class="{'sure-active-true':name_value && password_value && too_password_value == password_value}">注册</i>
        <a href="#/login" class="user-link">已有帐号？点我去登录</a>
    </div>
</template>
<script>
    import headTitle from '../../components/head-title.vue'
    import types from '../../store/mutation-types'
    import Util from '../../assets/lib/Util'
    import { XInput } from 'vux'
    export default {
        name: 'register',
        data () {
            return {
                name_value: '',
                password_value: '',
                is_repeat: false,
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
            /**注册*/
            register () {
                if(this.checkInput()) return;
                var new_user = {
                    user_name: this.name_value,
                    user_password: this.password_value,
                    user_too_password: this.too_password_value
                };
                Util.register(new_user,(data) => {
                    this.showMsg(data.msg);
                    if (data.status == 1) this.reset();
                })
            },
            /**清空信息*/
            reset () {
                this.name_value = '';
                this.password_value = '';
                this.is_repeat = false;
                this.too_password_value = '';
            },
            /**验证信息*/
            checkInput () {
                if ( !this.name_value ) {
                    this.showMsg('请输入帐号');
                    return true;
                }
                if ( !this.password_value ) {
                    this.showMsg('请输入密码');
                    return true;
                }
                if ( !this.too_password_value ) {
                    this.showMsg('请确认密码');
                    return true;
                }
                if ( this.password_value != this.too_password_value ) {
                    this.showMsg('两次密码不一致');
                    return true;
                }
                return false;
            },
            checkUserName () {
                if(!this.name_value) return;
                Util.checkUserName(this.name_value,(data) => {
                    if (data.status == 0) {
                        this.showMsg(data.msg);
                        this.is_repeat = true;
                    }else {
                        this.is_repeat = false;
                    }
                })
            },
            showMsg (msg) {
                this.$vux.toast.show({
                    type: 'text',
                    width: 'auto',
                    text: msg,
                    position: 'top'
                });
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

