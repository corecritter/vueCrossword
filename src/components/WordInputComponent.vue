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
    <br>
    <div v-show="has_error" class="error-message">
      {{ error_message }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import TestComponent from './TestComponent.vue'
import { AllInputWords, SetInputWords, SetParsedInputWords } from '../main'
import { Word } from '../logic/crossword'
import { generate } from '../logic/generate'

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
      ],
      json_error: false,
      has_error: false,
      error_message: ""
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
      this.has_error = false
      try {
        //var jString= JSON.stringify(this.jsonDemoString)
        //var jsonObject = JSON.parse(jString)
        var jsonObject = JSON.parse(this.input_words)
        var words = []
        var parsedWords = new Array() as Array<Word>
        for (let i = 0; i < jsonObject.length; i++) {
          var current = jsonObject[i]
          var hint = current.hint
          var word = {} as Word
          word.value = current.word
          parsedWords.push(word)
        }
        //SetParsedInputWords(this.$store, parsedWords)
        var wordList = parsedWords.map(x => x.value)
        var result = generate(wordList)
        if(result.success) {
          SetParsedInputWords(this.$store, result.words)
          this.$router.push({ path: 'view' })
        }
        else
        {
          this.has_error = true
          this.error_message = "We just couldn't make it work with the words. Try adding more or taking some out"
        }
      }
      catch {
        this.has_error = true
        this.error_message = "Invalid JSON was entered. Go on now, fix it and give it another go!"
      }
    },      
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
.error-message {
  padding: 10px;
  color: red
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
