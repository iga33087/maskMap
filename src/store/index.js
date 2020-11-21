import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:false
  },
  mutations: {
    loading(state,x) {
      state.loading=x
    }
  },
  actions: {
    loading (context,x) {
      context.commit('loading',x)
    }
  },
  modules: {
  }
})
