<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <input v-model="input_words" placeholder="enter the words"/>
    {{ input_words }}
    <button v-on:click="generate_click">Generate!</button>
    <!-- <textarea :value="input" @input="update"></textarea> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import {AllInputWords, SetInputWords} from './main'

export default Vue.extend({
  name: 'app',
  components:{
    HelloWorld
  },
  computed: {
    input_words: {
      get() : string {
        return AllInputWords(this.$store)
      },
      set(value: string) {
        SetInputWords(this.$store, value);
      }
    }
  },
  // props: {
  //   input_words: {
  //     type: String,
  //     default: undefined
  //   }
  // },
  // data() {
  //   return {
  //     input: "",
  //     message : "Hello",
  //     word_input: ""
  //   }
  // },
  methods: {
    generate_click: function(event: Event) {
      this.$router.push({ path: "test" });
    }
  },
  mounted() {
    const a = this.$data;
    
    //this.$$
  }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
