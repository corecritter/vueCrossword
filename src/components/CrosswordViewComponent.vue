<template>
    <crossword-grid-component/>
    <!-- <hint-grid-component /> -->
</template>

<script lang="ts">
import Vue from 'vue'
import CrosswordGridComponent from './crossword/CrosswordGridComponent.vue'
import HintGridComponent from './crossword/HintGridComponent.vue'
import { Word, Cell, Board } from '../logic/crossword'
import { makeBoard } from '../logic/generate'
import { AllParsedWords } from '../main'

export default Vue.extend({
    components: {
        CrosswordGridComponent,
        HintGridComponent
    },
    data() {
    },
    mounted () {
    }
})
</script>

<style scoped>
</style>