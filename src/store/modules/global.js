import * as types from '../mutation_types'
console.log(types.FN_ADD_BOOKCASE)
const state = {
  isNight: false,
  fontSize: 40
}

const mutations = {

}

const actions = {

}

const getters = {
  fontSize: state => state.fontSize,
  isNight: state => state.isNight
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
