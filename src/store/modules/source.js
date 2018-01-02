import api from 'service'
import * as types from '../mutation_types'

const state = {
  sources: {}, // 所有源 (list)
  currentSource: {} // 当前选中源
}
const mutations = {
  [types.GET_SOURCE_LIST] (state, { id, list }) {
    state.sources[id] = list
    // 若改书籍没有默认源 则给其一个默认值
    if (Object.keys(state.currentSource).indexOf(id) === -1) {
      // 若有两个已上书籍源时 默认选中第二个 (第一个为vip收费源)
      state.currentSource[id] = list.length > 1 ? list[1]._id : list[0]._id
    }
  },
  [types.SET_SOURCE_CURRENT] (state, { id, source }) {
    state.currentSource[id] = source
  }
}

const actions = {
  getSourceList ({ commit }, id) {
    return api.get(`toc?view=summary&book=${id}`, {}).then((data) => {
      commit(types.GET_SOURCE_LIST, {id, list: data})
    })
  },
  setSourceCurrent ({ commit }, { id, source }) {
    commit(types.SET_SOURCE_CURRENT, { id, source })
  }
}

const getters = {
  list: state => state.sources,
  current: state => state.currentSource
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
