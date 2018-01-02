// import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

// Vuex is auto installed on the web
/* eslint-disable no-undef */
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}

const debug = false
const store = new Vuex.Store({
  modules,
  strict: debug
})
export default store
