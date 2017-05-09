<template>
    <div class="container-view">
        <head-title :title="'协议：'"></head-title>
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
