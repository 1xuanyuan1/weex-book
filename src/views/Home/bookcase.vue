<template>
  <div class="wrapper">
    <scroller class="scroller">
      <refresh ref="refresh" class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
        <text class="indicator">Loading ...</text>
      </refresh>
      <div class="row" v-for="item in bookcase" @click="getBook(item._id)">
        <image :src="getImageUrl(item.cover)" class="image"></image>
        <div class="content">
          <text class="title">{{item.title}}</text>
          <text class="subtitle">{{getUpdateTime(item.updated)}} {{item.lastChapter}}</text>
        </div>
      </div>
    </scroller>
  </div>
</template>
<style scoped>
.indicator {
  color: #888888;
  font-size: 42px;
  text-align: center;
}
.row{
  flex-direction: row;
  height: 150px;
  padding: 20px;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
}
.image{
  width: 80px;
  height: 120px;
  margin-right: 20px;
}
.title{
  font-size: 30px;
}
.subtitle{
  font-size: 24px;
}
.content{
  height: 120px;
  align-items: stretch;
  justify-content: space-around;
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      refreshing: false,
      updateInfo: {}
    }
  },
  computed: {
    ...mapGetters({
      bookcase: 'book/bookcase'
    }),
    ids () {
      return Array.from(this.bookcase, (item) => {
        return item._id
      })
    }
  },
  methods: {
    getInfo () {
      this.refreshing = true
      this.$api.get('book?view=updated&id=' + this.ids.join(','), {}).then((data) => {
        this.refreshing = false
        data.map((item) => {
          this.bookcase[item._id] = {
            ...this.bookcase[item._id],
            ...item
          }
        })
      })
    },
    onrefresh () {
      this.getInfo()
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style>
</style>
