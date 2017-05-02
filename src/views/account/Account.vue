<template>
    <transition :name="animateName">
        <!--<keep-alive>-->
        <router-view></router-view>
        <!--</keep-alive>-->
    </transition>
</template>
<script>
    export default {
        name: 'account',
        computed: {
            animateName () {
                console.log(1)
                return this.$store.state.animate_name;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .vux-popup-picker-header-menu-right,
    .dp-right{
        font-size: 16px !important;
        color: #58B7FF !important;
    }
    .dp-left{
        font-size: 16px !important;
        color: #828282 !important;
    }
    .header-title{
        @extend %f18;
        @extend %fwn;
        padding: 20px;
        color: #1D8CE0;
    }
    .input-warp{
        padding: 0 10px;
    }
    .input-item{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #58B7FF;
        .weui-cell{
            padding: 0 10px;
        }
        .weui-cell__primary,
        .vux-cell-primary,
        .vux-datetime-value,
        p,
        .weui-label,
        .vux-label{
            @extend %f14;
        }
        .weui-input{
            @extend %tar;
        }
        .weui-input,
        .vux-popup-picker-value{
            @extend %c9;
        }
        .week{
            @extend %tac;
        }
    }
</style>
