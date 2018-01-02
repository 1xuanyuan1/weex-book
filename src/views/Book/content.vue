<template lang="html">
  <div class="container" :style="{'background-color':background}">
    <scroller class="scroller" @click="toggleMenu" >
      <div v-if="error === ''">
        <div class="content-container" v-for="(content, index) in contents" :class="{border: index > 0}">
          <text class="content" :style="{'color': color}">{{content}}</text>
        </div>
      </div>
      <div class="content-error" v-else>
        {{error}}
      </div>
      <loading class="loading" @loading="getNext" :display="showLoading">
        <text class="indicator">Loading ...</text>
      </loading>
    </scroller>
    <div class="menu" v-if="showMenu">
      <text class="menu-item">调整字体</text>
      <text class="menu-item" @click="jump('/book/source')">更换书源</text>
      <text class="menu-item" @click="jump('/book/directory')">查看目录</text>
      <text class="menu-item" @click="toggleModel">{{isNight ? '白天模式' : '夜间模式' }}</text>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      error: '', // 书源异常
      showMenu: false, // 是否显示菜单
      isLoading: false, // 是否正在加载下一页
      contents: [],
      showLoading: 'hide', // 是否显示加载中
      isNight: false // 是否开启夜间模式
    }
  },
  computed: {
    ...mapGetters({
      currentChapter: 'book/currentBookChapter',
      pages: 'book/pages',
      currentBook: 'book/current'
    }),
    background () {
      return this.isNight ? '#0C0C0C' : '#FFFFFF'
    },
    color () {
      return this.isNight ? '#4E4E4E' : '#000000'
    }
  },
  methods: {
    ...mapActions({
      fnNextPage: 'book/fnNextPage',
      fnPreviousPage: 'book/fnPreviousPage'
    }),
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    getContent () {
      console.log(this.getContentUrl(this.currentChapter[this.currentBook].link))
      this.$api.get(this.getContentUrl(this.currentChapter[this.currentBook].link)).then((data) => {
        this.$util && this.$util.setTitle(data.chapter.title)
        this.contents.push(`${data.chapter.body}`)
      }).catch((e) => {
        this.error = '该书源信息异常请切换其他书源'
        this.$util.showToast(this.error)
      })
    },
    getNext (event) {
      if (this.isLoading) return
      this.isLoading = true
      this.showLoading = 'show'
      this.fnNextPage(this.currentBook).then(() => {
        this.isLoading = false
        this.showLoading = 'hide'
        this.getContent()
      })
    },
    toggleModel () {
      this.isNight = !this.isNight
      this.toggleMenu()
    }
  },
  mounted () {
    console.log('content')
    this.getContent()
  }
}
</script>

<style>
.list {
  flex: 1;
}
.menu {
  height: 120px;
  flex-direction: row;
  align-items: center;
  background-color: #f4f7f9;
  border-top-color: #ccc;
  border-top-style: solid;
  border-top-width: 1px;
}
.menu-item{
  flex: 1;
  font-size: 30px;
  text-align: center;
  color: #999999;
}
.content-container {
  padding: 30px;
}
.content{
  font-size: 40px;
}
.content-error{
  flex: 1;
  justify-content: center;
  align-items: center;
}
.border {
  border-top-color: #999;
  border-top-style: solid;
  border-top-width: 20px;
}
.loading {
  justify-content: center;
}
.indicator {
  color: #888888;
  font-size: 42px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
}
</style>
