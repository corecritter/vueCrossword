<template>
    <div class="cell-style">
        {{cell.value}}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Cell } from '../../logic/crossword'

export default Vue.extend({
    props: {
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
    .cell-style {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 20px;
        font-size: 30px;
        text-align: center;
    }
</style>