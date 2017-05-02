<template>
    <div class="container-view home-wrap">
        <div class="balance-wrap">
            <h2 class="balance-title">可用余额</h2>
            <h1 class="balance-total">6000.00</h1>
        </div>
        <div class="go-btn-box">
            <a href="#/account/consumption" class="go-account go-consumption">消费</a>
            <a href="#/account/earn" class="go-account go-earn">入账</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'home'
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .balance-wrap{
        @extend %pa;
        @extend %oh;
        top: 10%;
        width: 60%;
        left: 50%;
        transform: translate3d(-50%,0,0);
        padding-bottom: 60%;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid rgb(224, 230, 237)
    }
    .balance-title{
        @extend %pa;
        @extend %f12;
        @extend %fwn;
        @extend %tac;
        @extend %l0;
        @extend %r0;
        color: #999;
        top: 30%;
    }
    .balance-total{
        @extend %pa;
        @extend %fwn;
        @extend %tac;
        @extend %l0;
        @extend %r0;
        @extend %t50;
        height: 48px;
        margin-top: -24px;
        line-height: 48px;
        font-size: 24px;
        color: #58B7FF;
        &:after{
            @extend %pa;
            @extend %f12;
            line-height: 42px;
            content: '(￥)';
            bottom: 0;
            color: #999;
        }
    }
    .go-btn-box{
        @extend %pa;
        @extend %tac;
        @extend %f16;
        @extend %cfff;
        @extend %l0;
        @extend %r0;
        bottom: 25%;
    }
    .go-account{
        @extend %db;
        @extend %cp;
        @extend %cfff;
        margin: 20px auto 0;
        width: 120px;
        height: 32px;
        line-height: 32px;
        background-color: #58B7FF;
        border-radius: 5px;
        &.go-consumption{
            background-color: #FF4949;
            box-shadow: 0 3px 0 0 red;
        }
        &.go-earn{
            background-color: #69ce72;
            box-shadow: 0 3px 0 0 #13CE66;
        }
    }
</style>
