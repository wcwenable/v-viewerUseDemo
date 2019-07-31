<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li v-for="(item, index) in data" :key="index"><img :src="item.picUrl"></li>
    </ul>
    <div class="loading-wrapper"></div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      data: [],
      ocrRecognizeListObj: null,
      scroll: null
    }
  },
  created () {
    this.loadData()
  },
  mounted () {
    this.scroll = this.scroll || new BScroll(this.$refs.wrapper, {
      scrollbar: {
        fade: false,
        interactive: false // 1.8.0 新增
      },
      pullUpLoad: {
        // threshold: 0,
        moreTxt: '加载更多',
        noMoreTxt: '没有更多数据了'
      },
      pullDownRefresh: {
        threshold: 90,
        stop: 40
      }
    })
    console.log('this.scroll515', this.scroll)
    this.scroll.on('pullingDown', () => {
      this.loadData()
      // this.scroll.refresh()
    })
  },
  computed: {},
  methods: {
    loadData () {
      this.$http.post('/api/getOcrRecognizeList').then(res => {
        console.log('getOcrRecognizeList> res515', res, res.data.data)
        this.ocrRecognizeListObj = res.data && res.data.data
        if (this.ocrRecognizeListObj && this.ocrRecognizeListObj.records && this.ocrRecognizeListObj.records.length) {
          this.data = this.ocrRecognizeListObj.records.concat(this.data)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .wrapper {
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    height: 600px;
    width: 100%;
  }
</style>
