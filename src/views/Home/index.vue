<template>
  <div class="wrapper">
    <router-view style="flex:1"></router-view>
    <div class="nav">
      <div class="nav-item" v-for="(value, key) in nav" :key="key" @click="jump(`/home/${key}`)">
        <text class="title">{{value}}</text>
      </div>
    </div>
  </div>
</template>
<style>
.title {
  font-size: 30px;
}
.scroller {
  flex: 1;
}
.nav {
  flex-direction: row;
  height:80px;
}
.nav-item {
  flex:1;
  justify-content: center;
  align-items:center;
  border-width:1;
}
</style>
<script>
export default {
  data () {
    return {
      nav: {
        '': '书架',
        recommend: '推荐',
        search: '搜索'
      }
    }
  }
}
</script>
