<template>
<div v-bind:style="grid_style">
    <div class="grid-item" v-for="(cell, index) in board" :key="index">
        <crossword-cell-component />
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import CrosswordCellComponent from './CrosswordCellComponent.vue'
import { AllInputWords, SetInputWords } from '../../main'
import { Word, Cell, Board } from '../../logic/crossword'
import { makeBoard } from '../../logic/generate'
import { AllParsedWords } from '../../main'

export default Vue.extend({
    components: {
        CrosswordCellComponent
    },
    data () {
        return {
            board: [],
            grid_style: {
                display: 'grid', 
                'grid-template-columns': 'repeat(1, auto)',
                'grid-template-rows': 'repeat(1, auto)'
            }
        }
    },
    mounted () {
        var parsedWords = AllParsedWords(this.$store)
        var board = makeBoard(parsedWords) as Board
        // for (let index = 0; index < parsedWords.length; index++) {
        //     var word = parsedWords[index]
        //     var xFac = 1
        //     var yFac = 0
        //     if(word.direction == 'v') {
        //         xFac = 0
        //         yFac = 1
        //     }
        //     for (let i = 0; i < word.value.length; i++) {
        //         var x = word.startX + (i * xFac)
        //         var y = word.startY + (i * yFac)
        //         var cell = board.GetCell(x, y)
        //     }
        // };

        
        var extent = board.GetExtent()
        //document.querySelector('.cell-container').style.setProperty('--grid-items', gridItemSetting);
        var xRange = extent.x[1] - extent.x[0]
        var yRange = extent.y[1] - extent.y[0]

        this.grid_style = {
            display: 'grid',
            'grid-template-columns': 'repeat(2, auto)',
            'grid-template-rows': 'repeat(2, auto)'
        }

        this.board = [{},{}]
    }
})
</script>

<style scoped>
.grid-style {
    display: grid; 
    grid-template-columns: repeat(2, auto); 
    grid-template-rows: repeat(2, auto);
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>