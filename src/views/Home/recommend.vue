<template>
  <div class="wrapper">
    <scroller class="scroller">
      <refresh ref="refresh" class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
        <text class="indicator">Loading ...</text>
      </refresh>
      <div class="row" v-for="(item, index) in data" @click="getBook(item._id)">
        <image :src="getImageUrl(item.cover)" class="image"></image>
        <text class="title">{{item.title}}</text>
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
</style>

<script>
export default {
  data () {
    return {
      refreshing: false,
      data: {}
    }
  },
  methods: {
    getInfo () {
      this.refreshing = true
      this.$api.get('ranking/54d42d92321052167dfb75e3', {}).then((data) => {
        this.refreshing = false
        this.data = data.ranking.books
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
