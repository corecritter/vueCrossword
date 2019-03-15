<template>
    <div class="cell-style">
        <div v-if="cell.value">
            <div v-if="show_answer" class="space-style">
                {{cell.value}}
            </div>
            <div v-else class="space-style">
                -
            </div>
        </div>
        <div v-else class="fill-style">
             _  
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
    .space-style {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 20px;
        font-size: 30px;
        text-align: center;
    }
    .fill-style {
        background-color: black;
        color: black;
        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 20px;
        font-size: 30px;
    }
</style>