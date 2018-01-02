<template>
  <scroller class="scroller">
    <div class="container">
      <div class="source"v-for="(item, index) in sources" @click="changeSource(item._id)">
        <div class="source-info">
          <div class="source-info-title">
            <text class="source-info-name">{{item.name}}</text>
            <text class="source-info-time">{{getUpdateTime(item.updated)}}</text>
          </div>
          <text class="source-info-last">{{item.lastChapter}}</text>
        </div>
        <div class="source-right">
          <text class="source-right-current" v-if="item._id === currentId">当前选择</text>
          <text class="source-right-icon">>></text>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      sources: []
    }
  },
  computed: {
    ...mapGetters({
      currentBook: 'book/current',
      currentSource: 'source/current',
      sourceList: 'source/list'
    }),
    currentId () {
      return this.currentSource[this.currentBook]
    }
  },
  methods: {
    ...mapActions({
      setSourceCurrent: 'source/setSourceCurrent',
      getBookChapters: 'book/getBookChapters'
    }),
    changeSource (source) {
      this.setSourceCurrent({id: this.currentBook, source}).then(() => {
        console.log('changeSource:', this.currentSource)
        this.getBookChapters(source).then(() => {
          this.$router.back()
        })
      })
    }
  },
  mounted () {
    console.log('source:', this.currentBook)
    console.log('source:', this.currentSource)
    console.log('source:', this.currentSource[this.currentBook])
    this.sources = this.sourceList[this.currentBook]
  }
}
</script>

<style>
.container{
  background-color: #f4f7f9;
}
.source{
  height: 120px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: white;
  border-top-color: #ccc;
  border-top-style: solid;
  border-top-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.source-info-title{
  flex-direction: row;
}
.source-right {
  flex-direction: row;
}
.source-right-icon{
  font-size: 30px;
  color: #999999;
}
.source-right-current{
  font-size: 24px;
  color: #999999;
  margin-top: 4px;
  margin-right: 10px;
}
.source-info{
  width: 500px;
}
.source-info-last{
  font-size: 26px;
  margin-top: 15px;
  color: #999999;
  lines: 1;
}
.source-info-name{
  font-size: 24px;
  font-weight: bold;
}
.source-info-time{
  margin-left: 30px;
  font-size: 20px;
  color: #999999;
}
</style>
