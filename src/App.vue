<template>
  <div @androidback="back" class="app">
    <router-view style="flex:1"></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import utils from 'utils'
export default {
  methods: {
    ...mapActions({
      initBookcase: 'book/initBookcase',
      initPages: 'book/initPages'
    }),
    back () {
      this.$router.back()
    }
  },
  created () {
    utils.readCache('bookcase', {}).then((value) => {
      this.initBookcase(value)
    })
    utils.readCache('pages', {}).then((value) => {
      this.initPages(value)
    })
  }
}
</script>
<style scoped>
body{
  margin: 0px;
}
.app {
  font-size: 32px;
}
</style>
