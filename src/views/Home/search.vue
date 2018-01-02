<template>
  <div class="wrapper">
    <div class="search-box">
      <input class="search" v-model="query" ref="search"></input>
      <text class="title" @click="search">搜索</text>
    </div>
    <scroller class="scroller">
      <div class="search-result">
        <div class="result-row" v-for="(item, index) in data" @click="getBook(item._id)">
          <image :src="getImageUrl(item.cover)" class="image"></image>
          <div class="content">
            <text class="title">{{item.title}}</text>
            <text>{{item.lastChapter}}</text>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      data: {}
    }
  },
  methods: {
    search () {
      let params = {
        query: this.query
      }
      this.$refs.search.blur()
      this.$api.get('book/fuzzy-search', params).then((data) => {
        this.data = data.books
      })
    }
  }
}
</script>

<style scoped>
.scroller{
  flex: 1;
}
.result-row{
  flex-direction: row;
  height: 150px;
  padding: 20px;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
}
.search-box{
  flex-direction: row;
  height: 200px;
  justify-content: center;
  align-items: center;
}
.search{
  font-size: 50px;
  width: 500px;
  height: 100px;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: #666666;
  border-width: 2px;
  border-style: solid;
  border-color: #41B883;
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
