<template>
    <!--引导页面-->
    <div class="guide-wrap">
        <!--引导页-->
        <div class="guide-item"
             v-for="( guide_item , guide_index) in guide_arr"
             :style="{ backgroundImage: 'url(' + guide_item.img_url + ')' }"
             :class="{'guide-item-active': guide_active_index > guide_index}">
            <span @click="jumpGuide()" class="guide-go" v-if=" (guide_arr.length - 1) == guide_index">开启浪笔头之旅</span>
        </div>
        <!--/引导页-->
        <!--引导页索引-->
        <ul class="guide-trigger">
            <li class="guide-trigger-item"
                v-for="( guide_item , guide_index) in guide_arr"
                @click="guideTrigger(guide_index)"
                :class="{ 'guide-active-trigger': guide_active_index == (guide_index + 1) }">
            </li>
        </ul>
        <!--/引导页索引-->
        <!--跳过按钮-->
        <svg class="guide-jump" @click="jumpGuide()">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#guide-jump-icon"></use>
        </svg>
        <!--/跳过按钮-->
    </div>
    <!--/引导页面-->
</template>
<script>
    import GestureMobile from '../../assets/lib/GestureMobile'
    import Tool from '../../assets/lib/Tool'
    import types from '../../store/mutation-types'
    export default {
        name: 'guide',
        data () {
            return {
                guide_active_index: 1,
                guide_arr: [
                    { img_url: 'http://www.owulia.com/ink/static/img/guide_1.jpg' },
                    { img_url: 'http://www.owulia.com/ink/static/img/guide_2.jpg' },
                    { img_url: 'http://www.owulia.com/ink/static/img/guide_3.jpg' },
                    { img_url: 'http://www.owulia.com/ink/static/img/guide_4.jpg' }
                ]
            }
        },
        created () {
            this.$store.commit(types.JUDGE_IS_NOT_FIRST,false);
            this.$nextTick(() => {
                let _this = this;
                GestureMobile(this.$el,{
                    leftCallBackFun () {
                        if(_this.guide_active_index == _this.guide_arr.length) return;
                        _this.guide_active_index++;
                    },
                    rightCallBackFun () {
                        if(_this.guide_active_index == 1) return;
                        _this.guide_active_index--;
                    }
                });
            })
        },
        methods: {
            /**跳过引导页面*/
            jumpGuide () {
                Tool.dataToLocalStorageOperate.save('is_not_first',true);
                this.$store.commit(types.JUDGE_IS_NOT_FIRST,true);
                this.$router.push('/')
            },
            /**索引触发*/
            guideTrigger (guide_index) {
                this.guide_active_index = guide_index + 1;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .guide-wrap{
        z-index: 999;
        @extend %pf;
        @extend %t0;
        @extend %l0;
        @extend %b0;
        @extend %r0;
        @extend %oh;
        animation-duration: .5s;
        animation-fill-mode: both;
    }
    .guide-item{
        @extend %pa;
        @extend %w100;
        @extend %h100;
        @extend %l0;
        transform: translate3d(100%,0,0);
        transition: transform .5s;
        repeat: no-repeat;
        background-position: center;
        background-attachment:fixed;
        //filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
        //-ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
        background-size: cover;
        -moz-background-size: cover;
        -webkit-background-size: cover;
        &.guide-item-active{
            transform: translate3d(0,0,0);
        }
    }
    .guide-trigger{
        @extend %pa;
        @extend %tac;
        @extend %l0;
        @extend %r0;
        @extend %fs0;
        bottom: 30px;
    }
    .guide-trigger-item{
        @extend %cp;
        @extend %dib;
        @extend %pr;
        width: 10px;
        height: 10px;
        border: 1px solid #58B7FF;
        border-radius: 50%;
        margin: 0 5px;
        transition: all .5s;
        &:after{
            content: '';
            @extend %pa;
            @extend %t50;
            @extend %l50;
            width: 6px;
            height: 6px;
            margin-top: -3px;
            margin-left: -3px;
            transition: all .5s;
            border-radius: 50%;
            background-color: #fff;
        }
        &.guide-active-trigger{
            &:after{
                background-color: #58B7FF;
            }
        }
    }
    .guide-jump{
        @extend %cp;
        @extend %pa;
        width: 20px;
        height: 20px;
        top: 20px;
        right: 20px;
        fill: #1296db;
    }
    .guide-go{
        @extend %pa;
        @extend %tac;
        @extend %f14;
        @extend %cp;
        @extend %l50;
        @extend %cfff;
        border-radius: 10px;
        width: 120px;
        height: 40px;
        bottom: 80px;
        box-shadow: 0 3px 0 0 #1D8CE0;
        margin-left: -60px;
        line-height: 40px;
        background-color: #58B7FF;
    }
    .guide-wrap-hide{
        animation-name: guide-fadeOutUp;
    }
    @keyframes guide-fadeOutUp {
        from {
            opacity: 1;
        }
        to {
            transform: translate3d(0, -100%, 0);
        }
    }
</style>
