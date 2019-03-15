<template>
    <div class="cell-style">
        <div v-if="cell.value">
            <div class="root-space-style">
                <div v-if="show_answer" class="letter-style">
                    {{cell.value}}
                </div>
                <div v-else class="hidden-letter-style">
                    -
                </div>
                <div v-if="cell.cellNumber" class="number-style">
                    {{cell.cellNumber}}
                </div>
                <div v-else class="number-hidden-style">
                    -
                </div>
            </div>
        </div>
        <div v-else class="root-fill-style">
            <div class="fill-style">
                 _
            </div>
            <div class="small-fill-style">
                _
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Cell } from '../../logic/crossword'

export default Vue.extend({
    props: {
        show_answer: {
            type: Boolean,
            default: true
        },
        cell: {
            type: Object,
            default: {} as Cell
        }
    },
    mounted () {
        var b = this.$props.cell
        var a = 5
    }
})
</script>

<style scoped>
    .root-space-style {
        display:flex;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.8);
    }
    .letter-style {
        flex:1;
        text-align:center;
        font-size: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .hidden-letter-style {
        flex:1;
        color:white;
        text-align:center;
        font-size: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .number-style {
        flex: .1;
        font-size: 3px;
        text-align: left;
        color:black;
        font-weight: bold;
        font-size: 12px;
        padding: 5px;
    }
    .number-hidden-style {
        flex: .1;
        font-size: 3px;
        text-align: left;
        color:white;
        font-weight: bold;
        font-size: 12px;
        padding: 5px;
    }
    .root-fill-style {
        display:flex;
        flex-direction: column;
        background-color: black;
        border: 1px solid rgba(0, 0, 0, 0.8);
    }
    .fill-style {
        flex: 1;
        color: black;
        font-size: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .small-fill-style {
        flex: .1;
        background-color: black;
        color: black;
        font-weight: bold;
        font-size: 12px;
        padding: 5px;
    }
</style>