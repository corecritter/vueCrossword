<template>
<h1>Crossword View Component. The viewer for a generated crossword puzzle and hints</h1>
    <!-- <crossword-grid-component /> -->
    <!-- <hint-grid-component /> -->
</template>

<script lang="ts">
import Vue from 'vue'
import CrosswordGridComponent from './crossword/CrosswordGridComponent.vue'
import HintGridComponent from './crossword/HintGridComponent.vue'

export default Vue.extend({
    components: {
        CrosswordGridComponent,
        HintGridComponent
    }
})
</script>

<style>
</style>