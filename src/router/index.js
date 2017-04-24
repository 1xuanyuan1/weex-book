// import Vue from 'vue' // /*?*/ 在weex-hackernews里是注释掉的
import Router from 'vue-router'

import Main from '../views/test/main.vue'
import Foo from '../views/test/foo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/main', component: Main },
    { path: '/foo', component: Foo },
    { path: '/', redirect: '/foo' }
  ]
})
