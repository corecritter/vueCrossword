<template>
  <div class="root">
    <h3>Figure it out</h3>
    <div class="option-area">
        <div class="option-space">
            <p>Create a Crossword from scratch</p>
            <button class="button" v-on:click="create_click">Create</button>
        </div>
        <div class="option-space">
            <p>Solve a Crossword</p>
            <button class="button">Solve</button>
        </div>
        <br>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    create_click: function (event: Event) {
        this.$router.push({ path: 'input' })
    },      
  },
  mounted () {
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 60%;
  border: 1px solid rgb(5, 179, 34);
  padding: 10px;
}
.option-area {
  display: flex
}
.option-space {
  flex:  1;
}
.button {
  background-color: rgb(77, 202, 27);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
