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
        <div class="user-relevant">
            <span @click=" is_remember = !is_remember " :class="{ 'remember-active-user': is_remember }" class="remember-user">
                <i class="remember-type"></i>
                记住密码
            </span>
            <a href="#/" class="back-password">忘记密码？</a>
        </div>
        <i class="sure-btn" :class="{'sure-active-true':name_value && password_value}">登录</i>
        <a href="#/register" class="user-link">没有帐号？点我去注册</a>
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
                is_remember: false,
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
    .user-link{
        @extend %c9;
        margin: 20px;
    }
    .user-relevant{
        @extend %c9;
        @extend %pr;
        @extend %clearfix;
        @extend %f12;
        margin: 20px;
    }
    .remember-user{
        @extend %fl;
        @extend %cp;
        @extend %pr;
        padding-left: 16px;
        transition: color .5s;
        &.remember-active-user{
            color: #58B7FF;
            .remember-type{
                &:after{
                    background-color: #58B7FF;
                }
            }
        }
    }
    .remember-type{
        @extend %pa;
        @extend %t50;
        @extend %l0;
        margin-top: -6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #58B7FF;
        &:after{
            @extend %pa;
            @extend %t50;
            @extend %l50;
            margin-top: -3px;
            margin-left: -3px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            content: '';
            transition: background-color .5s;
            background-color: #fff;
        }
    }
    .back-password{
        @extend %fr;
        color: #58B7FF;
    }
    .login-wrap,.register-wrap{
        @extend %oya;
        .sure-btn.sure-active-true{
            background-color: #58B7FF;
            box-shadow: 0 3px 0 0 #1D8CE0;
        }
        .sure-btn{
            margin: 20px;
        }
    }
    .input-icon{
        @extend %vam;
        width: 25px;
        padding-right: 10px;
        height: 25px;
        fill: #999;
    }
</style>
