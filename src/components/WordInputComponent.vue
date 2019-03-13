<template>
  <div class="hello">
    <p>
      Enter your crossword input in the JSON format like this:
    </p>
    <input v-model="input_words" placeholder="enter the words"/>
    <button v-on:click="generate_click">Generate!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TestComponent from './TestComponent.vue'
import { AllInputWords, SetInputWords } from '../main'

export default Vue.extend({
  name: 'app',
  components: {
    TestComponent
  },
  computed: {
    input_words: {
      get () : string {
        return AllInputWords(this.$store)
      },
      set (value: string) {
        SetInputWords(this.$store, value)
      }
    }
  },
  methods: {
    generate_click: function (event: Event) {
      this.$router.push({ path: 'test' })
    }
  },
  mounted () {
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
