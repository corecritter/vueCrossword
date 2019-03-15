<template>
<div class="root">
    <div class="panel-area">
        <label>Show Answers</label>
        <input type="checkbox" v-model="show_answers" @change="show_answers_click"/>
    </div>
    <div class="board-area">
        <crossword-grid-component :show_answer="show_answers"/>
        <!-- <hint-grid-component /> -->
    </div>
</div>
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
        return {
            show_answers: true
        }
    },
    methods: {
        show_answers_click: function (event: Event) {

        }
    },
    mounted () {
    }
})
</script>

<style scoped>
.root {
    display: flex;
}
.board-area {
    flex: 1;
}
.panel-area {
    flex: .2;
}
</style>