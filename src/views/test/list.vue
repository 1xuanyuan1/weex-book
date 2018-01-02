<template>
  <scroller class="scroller">
    <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
      <text class="indicator">Refreshing ...</text>
    </refresh>
    <div class="cell" v-for="item in lists">
      <div class="panel">
        <div class="row" @click="test">
          <image :src="getImageUrl(item.cover)" class="image" ></image>
          <text class="text">{{item.title}}</text>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script>
import util from 'utils'

export default {
  data () {
    return {
      refreshing: false,
      lists: []
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    test () {
      util.showToast('test')
    },
    getInfo () {
      return this.$api.get('ranking/54d42d92321052167dfb75e3', {}).then((data) => {
        this.lists = data.ranking.books.slice(0, 10)
        console.log(this.lists)
        // this.$nexttick(() => {
        // })
      })
    },
    onrefresh (event) {
      console.log('is refreshing')
      util.showToast('refresh')
      this.refreshing = true
      this.getInfo().then(() => {
        this.refreshing = false
      })
    }
  }
}
</script>

<style scoped>
  .indicator {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .panel {
    height: 150px;
    padding: 20px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
  }
  .row {
    flex: 1;
    flex-direction: row;
    align-items: center;
  }
  .image{
    width: 80px;
    height: 120px;
    margin-right: 20px;
  }
  .text {
    font-size: 30px;
  }
</style>
