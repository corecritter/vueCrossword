<template>
<div v-bind:style="grid_style">
    <div class="grid-item" v-for="(cell, index) in board" :key="index">
        <crossword-cell-component
        :show_answer="show_answer"
        :cell="cell" />
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
    props: {
        show_answer : {
            type : Boolean,
            default: true
        }
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
        var extent = board.GetExtent()
        var xMin = extent.x[0]
        var xMax = extent.x[1]
        var yMin = extent.y[0]
        var yMax = extent.y[1]
        
        var cells = [] as Array<Cell>
        for(let i = extent.y[0]; i <= extent.y[1]; i++) {
            for(let j = extent.x[0]; j <= extent.x[1]; j++) {
                var cellValue = board.GetCell(j, i)

                if(cellValue) {
                    cellValue = cellValue.toUpperCase()
                }

                var cell = {
                    value: cellValue,
                    cellNumber: undefined
                } as Cell

                cells.push(cell)
            }
        }

        var xRange = extent.x[1] - extent.x[0] + 1
        var yRange = extent.y[1] - extent.y[0] + 1
        this.grid_style = {
            display: 'grid',
            'grid-template-columns': 'repeat('+ xRange +', auto)',
            'grid-template-rows': 'repeat(' + yRange + ', auto)'
        }

        this.board = cells
        //[{value: 'n', cellNumber:3} as Cell,{value: 'o', cellNumber:1} as Cell, {value: undefined } as Cell,
        //{value: 'q'} as Cell,{value: undefined} as Cell, {value: 'q' } as Cell]
    }
})
</script>

<style scoped>
</style>