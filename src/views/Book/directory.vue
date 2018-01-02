<template>
  <scroller class="scroller">
    <refresh ref="refresh" class="refresh" @refresh="onrefresh" :display="refreshing">
      <text class="indicator">Loading ...</text>
    </refresh>
    <div class="cell" v-for="(item, index) in list" >
      <text class="text" @click="toContent(index)">
        {{item.title}}
      </text>
    </div>
    <loading class="loading" @loading="onloading" :display="showLoading">
      <text class="indicator">Loading ...</text>
    </loading>
  </scroller>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      list: [],
      startPage: 0, // 开始页
      endPage: 0, // 结束页
      pageSize: 20,
      refreshing: 'hide', // 是否显示加载中
      showLoading: 'hide' // 是否显示加载中
    }
  },
  computed: {
    ...mapGetters({
      currentBook: 'book/current',
      chapters: 'book/chapters',
      pages: 'book/pages'
    }),
    myChapter () {
      return this.chapters[this.currentBook]
    },
    directorys () {
      return this.myChapter.slice(this.startPage, this.endPage)
    }
  },
  created () {
    this.startPage = this.pages[this.currentBook].current - this.pageSize / 2
    if (this.startPage < 0) this.startPage = 0
    this.endPage = this.startPage + this.pageSize
    this.toChange()
  },
  methods: {
    ...mapActions({
      fnToPage: 'book/fnToPage'
    }),
    toContent (index) {
      this.fnToPage(index).then(() => {
        this.jump('/book/content')
      })
    },
    toChange () {
      this.list = this.myChapter.slice(this.startPage, this.endPage)
    },
    onrefresh () {
      if (this.startPage === 0) return
      this.$util.showToast('加载中...')
      this.refreshing = 'show'
      setTimeout(() => {
        this.startPage -= this.pageSize
        if (this.startPage < 0) this.startPage = 0
        this.refreshing = 'hide'
        this.toChange()
      }, 300)
    },
    onloading (event) {
      if (this.myChapter.length === this.directorys.length) return
      this.$util.showToast('加载中...')
      this.showLoading = 'show'
      setTimeout(() => {
        this.endPage += this.pageSize
        this.showLoading = 'hide'
        this.toChange()
      }, 300)
    }
  }
}
</script>

<style>
.container{
  padding: 30px;
}
.text{
  font-size: 30px;
}
.loading {
  justify-content: center;
}
.refresh {
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
