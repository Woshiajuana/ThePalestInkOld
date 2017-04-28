<template>
    <!--引导页面-->
    <div class="guide-wrap">
        <!--第一页-->
        <div class="guide-item" :class="{'guide-item-active': guide_index > 0}"></div>
        <!--/第一页-->
        <!--第二页-->
        <div class="guide-item" :class="{'guide-item-active': guide_index > 1}"></div>
        <!--/第二页-->
        <!--第三页-->
        <div class="guide-item" :class="{'guide-item-active': guide_index > 2}">
            <span class="guide-go">开启浪笔头之旅</span>
        </div>
        <!--/第三页-->
        <!--跳过按钮-->
        <svg class="guide-jump">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#guide-jump-icon"></use>
        </svg>
        <!--/跳过按钮-->
    </div>
    <!--/引导页面-->
</template>
<script>
    import GestureMobile from '../../assets/lib/GestureMobile'

    export default {
        name: 'guide',
        data () {
            return {
                guide_index: 1
            }
        },
        created () {
            this.$nextTick(() => {
                let _this = this;
                GestureMobile(this.$el,{
                    leftCallBackFun (distance) {
                        if(_this.guide_index == 3) return;
                        _this.guide_index++;
                    },
                    rightCallBackFun (distance) {
                        if(_this.guide_index == 1) return;
                        _this.guide_index--;
                    }
                });
            })
        },
        methods: {

        },
        components: {

        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .guide-wrap{
        @extend %pf;
        @extend %t0;
        @extend %l0;
        @extend %b0;
        @extend %r0;
    }
    .guide-item{
        @extend %pa;
        @extend %w100;
        @extend %h100;
        @extend %l0;
        transform: translate3d(100%,0,0);
        transition: transform .5s;
        &:nth-child(1){
            background-color: #FF4949;
        }
        &:nth-child(2){
            background-color: #F7BA2A;
        }
        &:nth-child(3){
            background-color: #1F2D3D;
        }
        &.guide-item-active{
            transform: translate3d(0,0,0);
        }
    }
    .guide-jump{
        @extend %cp;
        @extend %pa;
        width: 30px;
        height: 30px;
        top: 20px;
        right: 20px;
        fill: #1296db;
    }
    .guide-go{
        @extend %pa;
        @extend %tac;
        @extend %f16;
        @extend %fwb;
        @extend %cp;
        @extend %l50;
        @extend %cfff;
        border-radius: 10px;
        width: 200px;
        height: 45px;
        bottom: 100px;
        box-shadow: 0 5px 0 0 #1D8CE0;
        margin-left: -100px;
        line-height: 45px;
        background-color: #58B7FF;
    }
</style>
