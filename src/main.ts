import Vue from 'vue'
import App from './App.vue'
import { getStoreAccessors } from 'vuex-typescript'
import * as Vuex from 'vuex'
import VueRouter from 'vue-router'
import MainComponent from './components/main/MainComponent.vue'
import WordInputComponent from './components/WordInputComponent.vue'
import TestComponent from './components/TestComponent.vue'
import CrosswordViewComponent from './components/CrosswordViewComponent.vue'
import { Word } from './logic/crossword'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false
interface InputState {
  InputWords?: string,
  ParsedInputWords?: Array<Word>,
  Category? : string,
  BoardSize? : string
}

interface RootState {
  version: string
}

type DataContext = Vuex.ActionContext<InputState, RootState>;

const data = {
  namespaced: true,
  state: {
    InputWords: '[{"word":"green","hint":""},{"word":"leprechaun","hint":""},{"word":"clover","hint":""},{"word":"lucky","hint":""},{"word":"cabbage","hint":""},{"word":"potofgold","hint":""},{"word":"magic","hint":""},{"word":"celtic","hint":""},{"word":"guiness","hint":""},{"word":"dublin","hint":""},{"word":"scotland","hint":""},{"word":"irishcream","hint":""},{"word":"shepardspie","hint":""}]',
    ParsedInputWords : [],
    Category: "",
    BoardSize: "",
  },
  getters: {
    GetInputWords (state: InputState) : string {
      return state.InputWords as string
    },
    GetParsedInputWords (state: InputState) : Array<Word> {
      return state.ParsedInputWords
    },
    GetCategory (state: InputState) : string {
      return state.Category
    },
    GetBoardSize (state: InputState) : string {
      return state.BoardSize
    }
  },
  mutations: {
    setInputWords (state: InputState, newValue: string) {
      console.log('setWordsAction triggered with', newValue)
      state.InputWords = newValue
    },
    setParsedInputWords(state: InputState, newValue: Array<Word>) {
      state.ParsedInputWords = newValue
    },
    setCategory (state: InputState, newValue: string) {
      state.Category = newValue
    },
    setBoardSize (state: InputState, newValue: string) {
      state.BoardSize = newValue
    }
  },
  actions: {

  }
}

export const InputModule: Vuex.Module<InputState, RootState> = data

const { commit, read, dispatch } = getStoreAccessors('InputModule')

const getters = data.getters

export const AllInputWords = read(getters.GetInputWords)
export const AllParsedWords = read(getters.GetParsedInputWords)
export const Category = read(getters.GetBoardSize)
export const BoardSize = read(getters.GetBoardSize)

export const SetInputWords = commit(data.mutations.setInputWords)
export const SetParsedInputWords = commit(data.mutations.setParsedInputWords)
export const SetCategory = commit(data.mutations.setCategory)
export const SetBoardSize = commit(data.mutations.setBoardSize)

export const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0'
  },
  modules: {
    InputModule
  }
})

const routes = [
  { path: '/', component:MainComponent },
  { path: '/input', component: WordInputComponent },
  { path: '/view', component: CrosswordViewComponent },
  { path: '/test', component: TestComponent }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
