<script src="../../../../CodeLibrary/移动端手势/GestureMobile.js"></script>
<template>
    <!--引导页面-->
    <div class="guide-wrap">
        <!--第一页-->
        <div class="guide-item guide-item-active"></div>
        <!--/第一页-->
        <!--第二页-->
        <div class="guide-item"></div>
        <!--/第二页-->
        <!--第三页-->
        <div class="guide-item"></div>
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
        created () {

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
            background-color: #99A9BF;
        }
        &:nth-child(2){
            background-color: #EFF2F7;
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
</style>
