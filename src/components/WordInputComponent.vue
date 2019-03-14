<template>
  <div class="root">
    <p>
      Enter your crossword input in JSON format like this:
    </p>
    <div class="json-pretty">
      <vue-json-pretty
        :data="jsonDemoString">
      </vue-json-pretty>
    </div>
    <input v-model="input_words" placeholder="enter the words"/>
    <br>
    <button v-on:click="generate_click">Generate!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import TestComponent from './TestComponent.vue'
import { AllInputWords, SetInputWords } from '../main'

export default Vue.extend({
  components: {
    TestComponent,
    VueJsonPretty
  },
  data () {
    return {
      jsonDemoString: [
          { word: 'Working', hint: 'You are probably not doing this right now' },
          { word: 'Daydream', hint: 'You are probably doing this right now' }
      ]
    }
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
.root {
  margin: auto;
  width: 60%;
  border: 1px solid rgb(5, 179, 34);
  padding: 10px;
}
.json-pretty {
  text-align: left;
}
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
