// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

import mixins from './mixins'

sync(store, router)

// register global mixins.
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router, store }, App))

router.push('/')

// import foo from './views/test/index.vue'
// foo.el = '#root'
// export default new Vue(foo)
