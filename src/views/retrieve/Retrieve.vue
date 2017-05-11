<template>
    <div class="container-view login-wrap">
        <head-title :title="'找回密码：'"></head-title>
        <ul class="input-warp">
            <li class="input-item input-required"
                :class="{ 'input-error': checkEmail}">
                <x-input novalidate type="text" placeholder="请输入邮箱" v-model="email_value">
                    <svg slot="label" class="input-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#email-icon"></use>
                    </svg>
                </x-input>
            </li>
        </ul>
        <i class="sure-btn" @click="subFun()" :class="{'sure-active-true': !checkEmail && email_value }">确认</i>
    </div>
</template>
<script>
    import headTitle from '../../components/head-title.vue'
    import types from '../../store/mutation-types'
    import Util from '../../assets/lib/Util'
    import Tool from '../../assets/lib/Tool'
    import { XInput } from 'vux'
    export default {
        name: 'retrieve',
        data () {
            return {
                email_value: '',
                is_timer: false
            }
        },
        computed: {
            checkEmail () {
                var szReg=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                return ( this.email_value && !szReg.test(this.email_value) );
            }
        },
        created () {
            this.setNavIndex();
        },
        methods: {
            /**验证输入*/
            checkInput () {
                if ( !this.email_value ) {
                    this.showMsg('请输入邮箱');
                    return true;
                }
                if ( !(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/).test(this.email_value) ) {
                    this.showMsg('邮箱格式不正确');
                    return true;
                }
                return false;
            },
            subFun () {
                if(this.checkInput()) return;
                if(this.is_timer) return;
                this.is_timer = true;
                this.$vux.loading.show({text:'Loading'});
                Util.retrievePassword({
                    email_value: this.email_value
                },(result) => {
                    setTimeout(() => {
                        this.$vux.loading.hide();
                        this.is_timer = false;
                        this.showMsg(result.msg);
                        if (result.status == 1) {
                            setTimeout(() => {
                                Tool.dataToSessionStorageOperate.clear();
                                this.$router.push('/login')
                            },1000)
                        }
                    },100)
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
            /**设置导航条按钮状态*/
            setNavIndex () {
                this.$store.commit(types.SET_NAV_INDEX,'1')
            }
        },
        components: {
            headTitle,
            XInput
        }
    }
</script>
