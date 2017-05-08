<template>
    <h1 class="header-title" v-text="title"></h1>
</template>
<script>
    export default {
        name: 'header-title',
        props: ['title']
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .header-title{
        @extend %f18;
        @extend %fwn;
        padding: 20px;
        color: #1D8CE0;
    }
</style>
