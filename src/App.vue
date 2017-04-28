<template>
    <div id="app">

        <router-view></router-view>

        <!--svg-->
        <svg-template></svg-template>
        <!--/svg-->
    </div>
</template>

<script>
    import SvgTemplate from './components/svg-template.vue'
    export default {
        name: 'app',
        components: {
            SvgTemplate
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/reset";
</style>
