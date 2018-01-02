<template lang="html">
  <div class="loan-box">
    <div class="loan-item" v-for="(item, index) in data" :key="index" @click="skip(item.url)">
      <img :src="item.image"/>
      <div class="content">
        <p class="title">{{item.title}}</p>
        <p class="subtitle">{{item.subTitle}}</p>
        <p class="subtitle"><span class="active">{{item.num}}人</span>&nbsp;已申请</p>
      </div>
      <div class="right">
        <span class="iconfont">&#xe635;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          title: '现金白卡-快速贷',
          subTitle: '日利率0.03%，最快3分钟到账',
          num: 121296,
          image: 'http://image.jiedianqian.com/xianjinbaika.png',
          url: 'https://api.xianjincard.com/act/light-loan?source_tag=H5-chuangqi'
        }, {
          title: '曹操贷-现金贷',
          subTitle: '日利率0.03%，每天限额1万名',
          num: 176754,
          image: 'http://a5.mzstatic.com/us/r30/Purple91/v4/96/79/15/967915e8-bd11-dd55-fb6d-1a90ddbb23e2/CRV_AP_360x216.jpeg',
          url: 'https://m.ppdai.com/act/cpa/?source=chuangqi&url=https://lnk0.com/kUN5g4'
        }, {
          title: '给你花-现金贷',
          subTitle: '日利率0.03%，额度高达5万',
          num: 154536,
          image: 'http://image.jiedianqian.com/160.png',
          url: 'http://h5.geinihua.com/html/dist/regist_loan.html?from=chuangqi&hmsr=geinihua&hmpl=cps'
        }, {
          title: '拍拍贷-极速借',
          subTitle: '日利率0.03%，门槛低，闪电放款',
          num: 246241,
          image: 'http://a2.mzstatic.com/us/r30/Purple111/v4/73/54/51/735451a6-5f68-4a5f-95d1-2b99b0eb6c26/CRV_AP_360x216.jpeg',
          url: 'http://m.ppdai.com/act/loan_landing/?source=tf394'
        }
      ]
    }
  },
  methods: {
    skip (to) {
      window.location.href = to
    }
  }
}
</script>

<style lang="scss">
$imgSize: 120px;
$padding: 40px;
$radiusSize: 10px;
$titleColor: #333;
$borderColor: #999;
$titleSize: 30px;
$activeColor: #127fc7;
$subtitleColor: #666;
.loan-item {
  background: white;
  padding: $padding;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid $borderColor;
  img{
    width: $imgSize;
    height: $imgSize;
    border-radius: $radiusSize;
    margin-right: $padding;
  }
  .content {
    width: calc(100vw - 250px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title{
      font-size: $titleSize;
      color: $titleColor;
    }
    .subtitle{
      color: $subtitleColor;
    }
  }
  .right {
    display: flex;
    align-items: center;
    font-size: $titleSize;
    color: $subtitleColor;
  }
  .active {
    color: $activeColor;
  }
}
</style>
