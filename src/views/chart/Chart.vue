<template>
    <div class="container-view">
        <h1 class="header-title">分析：</h1>
    </div>
</template>
<script>
    import types from '../../store/mutation-types'
    export default {
        name: 'chart',
        created () {
            this.$store.commit(types.SET_NAV_INDEX,'4')
        }
    }
</script>
