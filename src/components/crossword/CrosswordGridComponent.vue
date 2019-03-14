<template>
<h1>Crossword Grid Component. The Component to hold all the Crossword Cell Components.</h1>
</template>

<script lang="ts">
import Vue from 'vue'
import CrosswordCellcomponent from './CrosswordCellcomponent.vue'

export default Vue.extend({
    components: {
        CrosswordCellcomponent
    }
})
</script>

<style>
</style>