// import Vue from 'vue' // /*?*/ 在weex-hackernews里是注释掉的
import Router from 'vue-router'

import Main from '../views/test/main.vue'
import Foo from '../views/test/foo.vue'
import Animation from '../views/test/animation.vue'
import List from '../views/test/list.vue'

import Home from '../views/Home/index.vue'
import BookCase from '../views/Home/bookcase.vue'
import Recommend from '../views/Home/recommend.vue'
import Search from 'views/Home/search.vue'

import BookBase from 'views/Book/base.vue'
import BookIndex from 'views/Book/index.vue'
import BookDirectory from 'views/Book/directory.vue'
import BookContent from 'views/Book/content.vue'
import BookSource from 'views/Book/source.vue'

Vue.use(Router)

// const lazyLoading = (name, index = false) => (resolve) => require([`../views/${name}${index ? '/index' : ''}.vue`], resolve)

export default new Router({
  routes: [
    { path: '/home',
      component: Home,
      children: [{
        path: '',
        name: '书架',
        component: BookCase
      }, {
        path: 'recommend',
        name: '推荐',
        component: Recommend
      }, {
        path: 'search',
        name: '搜索',
        component: Search
      }]
    },
    { path: '/main', component: Main },
    { path: '/foo', component: Foo },
    { path: '/animation', component: Animation },
    { path: '/list', component: List },
    { path: '/recommend', name: '推荐', component: Recommend },
    { path: '/search', name: '搜索', component: Search },
    { path: '/book',
      component: BookBase,
      children: [{
        path: '',
        component: BookIndex
      }, {
        path: 'directory',
        name: '目录',
        component: BookDirectory
      }, {
        path: 'content',
        component: BookContent
      }, {
        path: 'source',
        name: '更换书源',
        component: BookSource
      }]
    },
    { path: '/', redirect: '/home' }
  ]
})
