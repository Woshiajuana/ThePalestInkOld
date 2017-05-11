<template>
    <div class="container-view">
        <head-title :title="'协议：'"></head-title>
        <p class="agreement-con">
            技术栈：vue2 + vue-router + vuex + vux + axios + node.js + express + mongodb <br>
            仅限技术分享，不作商业用途<br>
            联系Q群：511047429<br>
        </p>
    </div>
</template>
<script>
    import headTitle from '../../components/head-title.vue'
    import types from '../../store/mutation-types'
    export default {
        name: 'agreement',
        components: {
            headTitle
        },
        created () {
            this.$store.commit(types.JUDGE_IS_NOT_FIRST,false);
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .agreement-con{
        @extend %c9;
        @extend %f14;
        margin: 0 20px;
        line-height: 1.8;
    }
</style>
