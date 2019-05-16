<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else class="root">
    <div class="content-section">
      <select class="content-section" v-model="selected_category" >
        <option selected disabled value="">Select category</option>
        <option v-for="(category, index) in categories" :key="index">
          {{category}}
        </option>
      </select>
      <div class="filler"/>
      <select class="content-section" v-model="selected_board_size">
        <option selected disabled value="">Select size</option>
        <option v-for="(size, index) in boardSizes" :key="index">
          {{size}}
        </option>
      </select>
    </div>
    <br />
    <div class="content-section">
      <div class="filler"/>
      <button class="button" v-on:click="create_click" :disabled="createDisabled">Create</button>
      <div class="filler"/>
    </div>
    <!-- <div class="content-section">
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
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import { AllInputWords, SetInputWords, SetParsedInputWords, SetCategory, SetBoardSize } from '../main'
import { Word } from '../logic/crossword'
import { generate } from '../logic/generate'

export default Vue.extend({
  components: {
    VueJsonPretty
  },
  data () {
    return {
      categories: [],
      boardSizes: ['Small', 'Medium', 'Large'],
      jsonDemoString: [
          { word: 'Working', hint: 'You are probably not doing this right now' },
          { word: 'Daydream', hint: 'You are probably doing this right now' }
      ],
      json_error: false,
      has_error: false,
      error_message: "",
      selectedCategory: "",
      selectedBoardSize: "",
      createDisabled: true,
      isLoading: true
    }
  },
  computed: {
    selected_category: {
      get () : string {
        return this.selectedCategory
      },
      set (value: string) {
        this.selectedCategory = value
        this.setCreateDisabled()
      }
    },
    selected_board_size: {
      get () : string {
        return this.selectedBoardSize
      },
      set (value: string) {
        this.selectedBoardSize = value
        this.setCreateDisabled()
      }
    },
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
    setCreateDisabled: function () {
      this.createDisabled = this.selectedCategory == "" || this.selectedBoardSize == ""
    },
    create_click: function (event: Event) {
      SetCategory(this.$store, this.selected_category)
      SetBoardSize(this.$store, this.selected_board_size)
    },
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
    const self = this;
    setTimeout(function () {
       var categories = ['Animals', 'Cars']
       self.categories = categories
       self.isLoading = false 
    }, 3000)
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
  display: flex;
  flex-direction: column;
}
.content-section {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.button {
  flex:1;
  align-self: center;
  background-color: rgb(77, 202, 27);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.button:disabled {
  flex:1; 
  align-self: center;
  background-color: gray;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.filler {
  flex: .5;
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
