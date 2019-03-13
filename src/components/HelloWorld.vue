<template>
  <div class="hello">
    <button v-on:click="generate_click">Generate!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TestComponent from './TestComponent.vue'

export default Vue.extend({
  name: 'app',
  components:{
    TestComponent
  },
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
