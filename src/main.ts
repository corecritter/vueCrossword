import Vue from 'vue'
import App from './App.vue'
import { getStoreAccessors } from 'vuex-typescript';
import * as Vuex from 'vuex';

Vue.use(Vuex);

Vue.config.productionTip = false
interface InputState {
  InputWords?: string
}

interface RootState {
  version: string
}

type DataContext = Vuex.ActionContext<InputState, RootState>;

const data = {
  namespaced: true,
  state: {
    InputWords: "t1, t2"
  },
  getters: {
    GetInputWords(state: InputState ) : string {
      return state.InputWords as string;
    }
  },
  mutations: {
    setInputWords(state: InputState, newValue: string) {
      console.log('setWordsAction triggered with', newValue);
      state.InputWords = newValue;
    }
  },
  actions: {

  }
};

export const InputModule: Vuex.Module<InputState, RootState> = data;

const { commit, read, dispatch } = getStoreAccessors("InputModule");

const getters = data.getters;

export const AllInputWords = read(getters.GetInputWords);

export const SetInputWords = commit(data.mutations.setInputWords);

export const store = new Vuex.Store<RootState>({
  state: {
    version: "1.0"
  },
  modules: {
    InputModule
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')