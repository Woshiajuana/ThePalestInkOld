<template>
    <div class="account-wrap">
        <h1 class="account-title">
            记
            <svg slot="icon" class="account-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nav-account"></use>
            </svg>
            账
        </h1>
        <div class="go-btn-box">
            <a href="#/account/consumption" class="go-account go-consumption">消费</a>
            <a href="#/account/earn" class="go-account go-earn">入账</a>
        </div>
    </div>
</template>
<script>
    import types from '../../../store/mutation-types'
    export default {
        name: 'account_index',
        created () {
            this.setNavIndex();
        },
        methods: {
            setNavIndex () {
                this.$store.commit(types.SET_NAV_INDEX,'2')
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/scss/define";
    .account-title{
        @extend %pa;
        @extend %tac;
        @extend %r0;
        @extend %l0;
        @extend %c9;
        color: #58B7FF;
        font-size: 24px;
        top: 20%;
    }
    .account-icon{
        @extend %dib;
        @extend %vam;
        fill: #58B7FF;
        width: 60px;
        height: 60px;
    }
    .go-btn-box{
        @extend %pa;
        @extend %tac;
        @extend %f14;
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

