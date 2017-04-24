// import Vue from 'vue'
import Vuex from 'vuex'

// Vuex is auto installed on the web
/* eslint-disable no-undef */
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}
const state = {
  user: ''
}
const mutations = {

}
const actions = {

}
const getters = {
  user: state => state.user
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store
