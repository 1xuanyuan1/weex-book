// 追书神器 cdk
const STATIC_URL = 'http://statics.zhuishushenqi.com'
const CONTENT_URL = 'http://chapter2.zhuishushenqi.com/chapter/'
var { mapActions } = require('vuex')
export default {
  methods: {
    ...mapActions({
      getSourceList: 'source/getSourceList',
      setBookCurrent: 'book/setBookCurrent'
    }),
    jump (to) { // 路由跳转
      if (this.$router) {
        this.$router.push(to)
      }
    },
    getBook (id) { // 跳转到书籍页面
      this.getSourceList(id).then(() => {
        this.setBookCurrent(id)
        this.jump('/book')
      })
    },
    getImageUrl (url) { // 获取图片地址
      return STATIC_URL + url
    },
    getContentUrl (url) { // 获取内容地址
      return CONTENT_URL + url
    },
    getUpdateTime (dateStr) {
      if (!dateStr) return ''
      let date = new Date(dateStr)
      let now = new Date()
      let time = Math.round((now.getTime() - date.getTime()) / 1000)
      if (time < 60) {
        return `${time} 秒前更新`
      } else {
        time = Math.round(time / 60)
        if (time < 60) {
          return `${time} 分前更新`
        } else {
          time = Math.round(time / 60)
          if (time < 24) {
            return `${time} 小时前更新`
          } else {
            time = Math.round(time / 24)
            return `${time} 天前更新`
          }
        }
      }
    }
  }
}
