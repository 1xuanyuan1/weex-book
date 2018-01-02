<template>
  <scroller class="scroller">
    <div class="container">
      <div class="row shortIntro">
        <image :src="getImageUrl(book.cover)" class="image"></image>
        <div class="content">
          <text class="title">{{book.title}}</text>
          <text class="subtitle">{{book.author}}</text>
          <text class="subtitle">{{book.lastChapter}}</text>
        </div>
      </div>
      <div class="row toolbox">
        <text class="btn" @click="jump('/book/directory')">章节目录</text>
        <text class="btn" @click="jump('/book/content')">开始阅读</text>
        <text class="btn" @click="addBook(book)" v-if="isExists === -1">放入书架</text>
        <text class="btn" @click="removeBook" v-else>移除书架</text>
      </div>
      <div>
        <text class="intro">{{book.longIntro}}</text>
      </div>
    </div>
  </scroller>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      currentBook: 'book/current',
      currentSource: 'source/current',
      bookcase: 'book/bookcase'
    }),
    source () {
      return this.currentSource[this.currentBook]
    }
  },
  data () {
    return {
      book: {},
      isExists: -1
    }
  },
  methods: {
    ...mapActions({
      getBookChapters: 'book/getBookChapters',
      addBookcase: 'book/addBookcase',
      removeBookcase: 'book/removeBookcase'
    }),
    addBook (book) {
      this.addBookcase(book).then(() => {
        this.isExists = book._id
      })
    },
    removeBook () {
      this.removeBookcase(this.currentBook).then(() => {
        this.isExists = -1
      })
    }
  },
  created () {
    this.isExists = Object.keys(this.bookcase).indexOf(this.currentBook)
    this.$api.get(`book/${this.currentBook}`).then((data) => {
      this.book = data
      this.$util && this.$util.setTitle(data.title)
    })
    this.getBookChapters(this.source)
  }
}
</script>

<style scoped>
.container {
  margin-top: 40px;
}
.row {
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
}
.shortIntro {
  padding-left: 60px;
}
.toolbox {
  margin-top: 40px;
  height:  100px;
}
.content {
  height: 240px;
  flex: 1;
  justify-content: space-around;
}
.image{
  width: 160px;
  height: 240px;
  margin-right: 40px;
}
.title {
  font-size: 40px;
}
.subtitle {
  font-size: 30px;
}
.intro {
  padding: 80px;
  font-size: 30px;
}
.btn{
  flex: 1;
  font-size: 30px;
  text-align: center;
}
</style>
