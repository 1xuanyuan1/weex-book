<template>
  <div>
    <slider class="slider" interval="3000" auto-play="true">
      <div class="frame" v-for="(img, index) in imageList" @click="jump(`/${paths[index]}`)">
        <image class="image" resize="cover" :src="img.src"></image>
      </div>
    </slider>
  </div>
</template>

<style scoped>
  .image {
    width: 700px;
    height: 700px;
  }
  .slider {
    margin-top: 25px;
    margin-left: 25px;
    width: 700px;
    height: 700px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
  .frame {
    width: 700px;
    height: 700px;
    position: relative;
  }
</style>

<script>
/* eslint-disable no-undef */
const modal = weex.requireModule('modal')
export default {
  data () {
    return {
      paths: ['main', 'list', 'animation'],
      imageList: [
        { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg' },
        { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg' },
        { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg' }
      ]
    }
  },
  mounted () {
    modal.toast({ message: '页面启动' })
    console.log('页面启动')
    this.$api.get('bookStore/ranking', {}).then((data) => {
      console.log('关键词信息获取')
      console.log(data)
    })
  }
}
</script>
