<template>
    <div class="container-view register-wrap">
        <head-title :title="'注册：'"></head-title>
        <ul class="input-warp">
            <li class="input-item input-required"
                :class="{'input-error':is_name_repeat && name_value}">
                <x-input :min="1"
                         :max="12"
                         @on-change="checkUserName()"
                         :debounce="1000"
                         novalidate
                         placeholder="请输入帐号" v-model="name_value">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user-icon"></use>
                    </svg>
                </x-input>
            </li>
            <li class="input-item input-required"
                :class="{ 'input-error': checkEmail || is_email_repeat}">
                <x-input @on-change="checkUserEmail()"
                    :debounce="1000"
                    novalidate type="text" placeholder="请输入邮箱" v-model="email_value">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#email-icon"></use>
                    </svg>
                </x-input>
            </li>
            <li class="input-item input-required"
                :class="{ 'input-error': password_value.length != 6 && password_value.length != 0}">
                <x-input novalidate type="password" placeholder="请输入6位密码" :min="6" :max="6" v-model="password_value">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password-icon"></use>
                    </svg>
                </x-input>
            </li>
            <li class="input-item input-required"
                :class="{ 'input-error': too_password_value && ( password_value != too_password_value ) }">
                <x-input novalidate type="password" placeholder="请确认密码" :min="6" :max="6" v-model="too_password_value">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password-icon"></use>
                    </svg>
                </x-input>
            </li>
        </ul>
        <p class="agreement-prompt">
            点击「注册」按钮，即代表你同意<a href="#/agreement">《浪笔头协议》</a>
        </p>
        <i class="sure-btn" @click="sendEmail()" :class="{'sure-active-true':name_value && password_value && too_password_value == password_value}">注册</i>
        <a href="#/login" class="user-link">已有帐号？点我去登录</a>

        <x-dialog v-model="is_popup" class="dialog-demo">
            <div class="dialog-con">
                <p class="dialog-prompt">
                    我们已向邮箱<strong>{{email_value}}</strong>发送了验证码(2分钟内有效)，请输入：
                </p>
                <div class="input-item input-required">
                    <x-input novalidate type="text" placeholder="请输入验证码" title="验证码：" :min="6" :max="6" v-model="code_value"></x-input>
                </div>
            </div>
            <span class="bill-dialog-close"  @click="is_popup = false"></span>
            <div class="bill-dialog-box" @click="register()">
                <span class="bill-dialog-ok"></span>
            </div>
        </x-dialog>
    </div>
</template>
<script>
    import headTitle from '../../components/head-title.vue'
    import types from '../../store/mutation-types'
    import Util from '../../assets/lib/Util'
    import { XInput, XDialog } from 'vux'
    export default {
        name: 'register',
        data () {
            return {
                code_value: '',
                name_value: '',
                email_value: '',
                password_value: '',
                too_password_value: '',
                is_name_repeat: false,
                is_email_repeat: false,
                is_popup: false,
                is_timer: false,
            }
        },
        computed: {
            checkEmail () {
                var szReg=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                return ( this.email_value && !szReg.test(this.email_value) );
            }
        },
        created () {
            this.$store.commit(types.JUDGE_IS_NOT_FIRST,false);
        },
        components: {
            headTitle,
            XInput,
            XDialog
        },
        methods: {
            /**发邮件*/
            sendEmail () {
                if(this.checkInput()) return;
                if(this.is_timer) return;
                this.is_timer = true;
                this.$vux.loading.show({text:'Loading'});
                Util.sendEmail(this.email_value,(result) => {
                    setTimeout(() => {
                        this.$vux.loading.hide();
                        this.is_timer = false;
                        if (result.status == 1) {
                            this.showMsg('验证邮件已发送');
                            this.is_popup = true;
                        } else{
                            this.showMsg('验证邮件发送失败');
                        }
                    },100)
                })
            },
            /**注册*/
            register () {
                if(!this.code_value) {
                    this.showMsg('请输入验证码');
                    return;
                }
                if(this.is_timer) return;
                this.is_timer = true;
                var new_user = {
                    user_name: this.name_value,
                    user_email: this.email_value,
                    user_password: this.password_value,
                    user_too_password: this.too_password_value,
                    user_code: this.code_value
                };
                this.$vux.loading.show({text:'Loading'});
                Util.register(new_user,(result) => {
                    setTimeout(() => {
                        this.$vux.loading.hide();
                        this.is_timer = false;
                        if(result.status == 1){
                            this.is_popup = false;
                            this.reset();
                        }
                        this.showMsg(result.msg);
                    },100)
                });
            },
            /**清空信息*/
            reset () {
                this.name_value = '';
                this.password_value = '';
                this.email_value = '';
                this.too_password_value = '';
                this.is_name_repeat = false;
                this.is_email_repeat = false;
            },
            /**验证信息*/
            checkInput () {
                if ( !this.name_value ) {
                    this.showMsg('请输入帐号');
                    return true;
                }
                if ( this.is_name_repeat ) {
                    this.showMsg('帐号已存在');
                    return true;
                }
                if ( !this.email_value ) {
                    this.showMsg('请输入邮箱');
                    return true;
                }
                if ( !(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/).test(this.email_value) ) {
                    this.showMsg('邮箱格式不正确');
                    return true;
                }
                if ( this.is_email_repeat ) {
                    this.showMsg('邮箱已存在');
                    return true;
                }
                if ( !this.password_value ) {
                    this.showMsg('请输入密码');
                    return true;
                }
                if ( this.password_value.length != 6 ) {
                    this.showMsg('请输入6位密码');
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
                Util.checkUserRepeat({user_name: this.name_value},(result) => {
                    if (result.status == 0) {
                        this.showMsg('帐号已存在');
                        this.is_name_repeat = true;
                    }else {
                        this.showMsg('帐号可以注册');
                        this.is_name_repeat = false;
                    }
                })
            },
            checkUserEmail () {
                if(!this.email_value || !(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/).test(this.email_value)) return;
                Util.checkUserRepeat({user_email: this.email_value},(result) => {
                    if (result.status == 0) {
                        this.showMsg('邮箱已存在');
                        this.is_email_repeat = true;
                    }else {
                        this.showMsg('邮箱可以注册');
                        this.is_email_repeat = false;
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
    .dialog-prompt{
        text-align: left;
        line-height: 1.8;
        margin: 10px;
        strong{
            color: #58B7FF;
        }
    }
    .dialog-demo{
        .input-item{
            margin: 0 10px;
        }
    }
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

