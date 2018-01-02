// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './service'
import { sync } from 'vuex-router-sync'
import util from 'utils'
import mixins from './mixins'

sync(store, router)

// register global mixins.
Vue.mixin(mixins)

Vue.prototype.$api = api
Vue.prototype.$util = util

// 路由钩子 当路由改变时修改标题
router.beforeEach((to, from, next) => {
  util.setTitle(to.name)
  next()
})
/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router, store }, App))

router.push('/')
// import foo from './views/test/index.vue'
// foo.el = '#root'
// export default new Vue(foo)
