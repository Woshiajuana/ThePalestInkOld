<template>
    <div class="container-view">
        <transition :name="animateName">
            <!--<keep-alive>-->
            <router-view></router-view>
            <!--</keep-alive>-->
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'account',
        computed: {
            animateName () {
                return this.$store.state.animate_name;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .consumption-wrap,
    .earn-wrap,
    .account-wrap{
        @extend %w100;
        @extend %h100;
        @extend %oya;
    }
    .vux-popup-picker-header-menu-right,
    .dp-right{
        font-size: 16px !important;
        color: #58B7FF !important;
    }
    .dp-left{
        font-size: 16px !important;
        color: #828282 !important;
    }

    .input-warp{
        padding: 0 10px;
    }
    .input-required{
        @extend %pr;
        &:before{
            content: '*';
            @extend %pa;
            @extend %f16;
            color: red;
        }
    }
    .bill-time-item,
    .input-item{
        @extend %pr;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        transition: border-bottom .5s;
        .vux-cell-box:before {
            @extend %dn;
        }
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
        .vux-prev-icon, .vux-next-icon{
            border: 1px solid #58B7FF;
            border-top: none;
            border-right: none;
        }
        .inline-calendar td.current > span {
            background-color: #58B7FF;
        }
        .inline-calendar td.is-today, .inline-calendar td.is-today.is-disabled {
            color: #58B7FF;
        }
        &:after,
        &:before{
            content: '';
            @extend %pa;
            @extend %b0;
            width: 1px;
            height: 5px;
            background-color: #ccc;
        }
        &:after{
            @extend %r0;
        }
        &:before{
            @extend %l0;
        }
    }
    .sure-btn{
        @extend %db;
        @extend %cp;
        @extend %f16;
        @extend %tac;
        @extend %cfff;
        margin: 20px 20px 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        background-color: #bbb;
        box-shadow: 0 3px 0 0 #999;
        transition: background-color .5s;
    }
    .earn-wrap{
        .sure-btn.sure-active-true{
            background-color: #69ce72;
            box-shadow: 0 3px 0 0 #13CE66;
        }
    }
    .consumption-wrap{
        .sure-btn.sure-active-true{
            background-color: #FF4949;
            box-shadow: 0 3px 0 0 red;
        }
    }
</style>
