<template>
    <!--引导页面-->
    <div class="guide-wrap">
        <!--第一页-->
        <div class="guide-item"></div>
        <!--/第一页-->
        <!--第二页-->
        <div class="guide-item"></div>
        <!--/第二页-->
        <!--第三页-->
        <div class="guide-item"></div>
        <!--/第三页-->
        <!--跳过按钮-->
        <span class="guide-jump">跳过引导页</span>
        <!--/跳过按钮-->
    </div>
    <!--/引导页面-->
</template>
<script>

    export default {
        name: 'guide',
        components: {

        },
        methods: {

        },
        data () {
            return {

            }
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
        transition: all .5s;
        &:nth-child(1){
            background-color: #333;
        }
        &:nth-child(2){
            background-color: #666;
        }
        &:nth-child(3){
            background-color: #999;
        }
        &.guide-item-active{
            transform: translate3d(0,0,0);
        }
    }
</style>
