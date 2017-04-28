<template>
    <div class="home-wrap">
        <guide v-if="is_guide"></guide>
        <h1 v-else>首页</h1>
    </div>
</template>
<script>
    import Guide from '../guide/Guide.vue'
    export default {
        name: 'home',
        data () {
            return {
                is_guide: true
            }
        },
        components: {
            Guide
        }
    }
</script>
