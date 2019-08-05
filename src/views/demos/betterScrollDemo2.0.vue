<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="bswrapperContainer">
            <div ref="bsWrapper" class="bswrapper">
              <div class="pulldown-scroller pullup-scroller">
                <div class="pulldown-wrapper">
                  <div v-show="beforePullDown">
                    <span>下拉刷新</span>
                  </div>
                  <div v-show="!beforePullDown">
                    <div v-show="isPullingDown">
                      <span>刷新中...</span>
                    </div>
                    <div v-show="!isPullingDown"><span>刷新成功</span></div>
                  </div>
                </div>
                <ul class="data-list">
                  <li v-for="(picInfo, index) in dataList" :key="index" class="data-list-item">
                    <img :src="picInfo && picInfo.picUrl" height="100px">
                  </li>
                </ul>
                <div class="pullup-wrapper">
                  <div v-show="beforePullUp">
                    <span>上拉加载更多</span>
                  </div>
                  <div v-show="!beforePullUp">
                    <div v-if="!isPullUpLoad" class="before-trigger">
                      <span class="">加载成功</span>
                    </div>
                    <div v-else class="after-trigger">
                      <span class="">加载中...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">4324234</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)
BScroll.use(PullDown)
const TIME_BOUNCE = 800
const TIME_STOP = 600
const THRESHOLD = 0
const STOP = 56
export default {
  data () {
    return {
      isPullUpLoad: false,
      beforePullDown: true,
      beforePullUp: true,
      isPullingDown: false,
      ocrRecognizeListObj: null,
      dataList: []
    }
  },
  created () {
    this.bscroll = null
    this.refreshDataList(0)
  },
  mounted () {
    this.initBscroll()
  },
  methods: {
    /*
          mode: 0(下拉刷新)，1（上拉加载）
        */
    refreshDataList (mode = 1) {
      return this.$http.post('/api/ocrRecognizeRecord/findOcrInfoByTempId').then(res => {
        mode === 0 && (this.dataList = [])
        // console.log('getOcrRecognizeList> res515', res, res.data.data)
        this.ocrRecognizeListObj = res.data && res.data.data
        if (this.ocrRecognizeListObj && this.ocrRecognizeListObj.records && this.ocrRecognizeListObj.records.length) {
          this.dataList = this.dataList.concat(this.ocrRecognizeListObj.records)
        }
      })
    },
    initBscroll () {
      this.bscroll = new BScroll(this.$refs.bsWrapper, {
        scrollY: true,
        bounceTime: TIME_BOUNCE,
        pullDownRefresh: {
          threshold: THRESHOLD,
          stop: STOP
        },
        pullUpLoad: {
          threshold: -100
        },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        scrollbar: true
      })
      this.bscroll.on('pullingUp', this.pullingUpHandler)
      this.bscroll.on('pullingDown', this.pullingDownHandler)
      this.bscroll.on('scroll', this.scrollHandler)
    },
    scrollHandler (pos) {
      // console.log(pos.y)
    },
    async pullingUpHandler () {
      this.beforePullUp = false
      this.isPullUpLoad = true
      await this.refreshDataList(1)
      this.finishPullUp()
      this.bscroll.refresh()
      this.isPullUpLoad = false
    },
    async finishPullUp () {
      const stopTime = TIME_STOP
      await new Promise(resolve => {
        setTimeout(() => {
          this.bscroll.finishPullUp()
          resolve()
        }, stopTime)
      })
      setTimeout(() => {
        this.beforePullUp = true
        this.bscroll.refresh()
      }, TIME_BOUNCE)
    },
    async pullingDownHandler () {
      this.beforePullDown = false
      this.isPullingDown = true
      await this.refreshDataList(0)
      this.isPullingDown = false
      this.finishPullDown()
    },
    async finishPullDown () {
      const stopTime = TIME_STOP
      await new Promise(resolve => {
        setTimeout(() => {
          this.bscroll.finishPullDown()
          resolve()
        }, stopTime)
      })
      setTimeout(() => {
        this.beforePullDown = true
        this.bscroll.refresh()
      }, TIME_BOUNCE)
    }
  }
}
</script>

<style lang="scss">
  .bswrapperContainer {
    height: 600px;
    // height: 100%;
  }
  .bswrapper {
    position: relative;
    height: 100%;
    padding: 0 10px;
    border: 1px solid #ccc;
    overflow: hidden;
  }
  .data-list {
    padding: 0;
    min-height: 650px;
    height: 100%;
  }
  .data-list-item {
    padding: 10px 0;
    list-style: none;
    // border-bottom: 1px solid #ccc;
  }
  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform: translateY(-100%) translateZ(0);
    text-align: center;
    color: #999;
  }
  .pullup-wrapper {
    padding: 20px;
    text-align: center;
    color: #999;
    overflow: hidden;
  }
</style>
