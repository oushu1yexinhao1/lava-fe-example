import { createStore } from 'vuex'
import global from '@/store/global'


const store = createStore({
  modules: {
    global
  },
  state() {
    return {}
  },
  mutations: {},
})

export default store
