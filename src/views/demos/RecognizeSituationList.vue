<template>
  <div>
    <div v-if="isShowPreview">
      <recognize-picture-full-preview @onClosePreview="handleClosePreview" ref="recognizePictureFullPreview" @ocrRecognizeListObjChange="handleOcrRecognizeListObjChange" @onFullPreviewDelete="handleRecognizeRecordDelete" :ocrRecognizeListObj='ocrRecognizeListObj'>
      </recognize-picture-full-preview>
    </div>
    <div v-show="!isShowPreview" class="bswrapperContainer">
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
          <div class="data-list">
            <el-row>
              <el-col :span="6" v-for="item in ocrRecognizeRecords" :key="item.ocrRecognizeRecordId"  class="dataListItem">
                <recognize-small-picture :currentOcrRecognizeRecordId="currentOcrRecognizeRecordId" :recognizeRecord="item" @onSmallPictureDelete="handleRecognizeRecordDelete" @onSmallPictureClick="handleShowPreview"></recognize-small-picture>
              </el-col>
            </el-row>
          </div>
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
</template>

<script>
import RecognizePictureFullPreview from '@/views/demos/RecognizePictureFullPreview'
import RecognizeSmallPicture from '@/views/demos/RecognizeSmallPicture'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
import Pullup from '@better-scroll/pull-up'
import {
  Promise
} from 'q'
BScroll.use(Pullup)
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)
BScroll.use(PullDown)
const TIME_BOUNCE = 800
const TIME_STOP = 600
const THRESHOLD = 0
const STOP = 56
export default {
  props: {
    uploadFiles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    RecognizePictureFullPreview,
    RecognizeSmallPicture
  },
  data () {
    return {
      isPullUpLoad: false,
      beforePullDown: true,
      beforePullUp: true,
      isPullingDown: false,
      ocrRecognizeListObj: null,
      dataList: [],
      isShowPreview: false,
      currentOcrRecognizeRecordId: null,
      currentUploadFiles: []
    }
  },
  watch: {
    uploadFiles: {
      deep: true,
      handler: function (newVal) {
        this.currentUploadFiles = this.deepClone(newVal) || []
        this.prependUploadFiles()
      }
    }
  },
  created () {
    this.bscroll = null
    this.refreshDataList(0)
  },
  mounted () {
    this.initBscroll()
  },
  computed: {
    ocrRecognizeRecords () {
      return this.ocrRecognizeListObj && this.ocrRecognizeListObj.records
    },
    getCurrentOcrRecognizeRecordId () {
      return this.ocrRecognizeListObj && this.ocrRecognizeListObj.currentOcrRecognizeRecordId
    }
  },
  methods: {
    handleRecognizeRecordDelete (recognizeRecord) {
      // console.log('handleRecognizeRecordDelete (recognizeRecord515', recognizeRecord)
      this.$confirm('是否删除此图片?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleOcrRecognizeListObjChange (newVal) {
      // console.log('handleOcrRecognizeListObjChange (newVal515', newVal)
      this.ocrRecognizeListObj = newVal && this.$refs.recognizePictureFullPreview.deepClone(newVal)
      this.currentOcrRecognizeRecordId = this.getCurrentOcrRecognizeRecordId
    },
    handleClosePreview () {
      this.isShowPreview = false
      this.$emit('onToggleFullPreview', false)
    },
    handleShowPreview (ocrRecognizeRecord, isValid) {
      // console.log('handleShowPreview (ocrRecognizeRecord515', ocrRecognizeRecord)
      this.currentOcrRecognizeRecordId = ocrRecognizeRecord.ocrRecognizeRecordId
      if (isValid) {
        this.ocrRecognizeListObj.currentOcrRecognizeRecordId = ocrRecognizeRecord.ocrRecognizeRecordId
        this.isShowPreview = true
      }
      this.$emit('onToggleFullPreview', true)
    },
    // mode: 0(下拉刷新)，1（上拉加载）
    refreshDataList (mode = 1) {
      return new Promise((resolve, reject) => {
        resolve({
          code: 0,
          data: {
            data: {
              current: 1,
              pageSize: 10,
              pages: 1,
              records: [{
                ocrRecognizeRecordId: `0orrId`,
                ocrTemplateId: this.currentOcrTemplateId,
                picUrl: require('@/assets/logo.png'),
                name: 'ceshi文件名',
                type: 'image/png',
                file: {},
                bizStatus: 2
              }],
              size: 50,
              total: 4
            }
          }
        })
      })
      // return this.$http.post('/api/getOcrRecognizeList')
        .then(res => {
          mode === 0 && (this.dataList = [])
          // console.log('getOcrRecognizeList> res515', res, res.data.data)
          this.ocrRecognizeListObj = res.data && res.data.data
          if (this.ocrRecognizeListObj && this.ocrRecognizeListObj.records && this.ocrRecognizeListObj.records.length) {
            // const ocrRecognizeRecordId = this.ocrRecognizeListObj.records[0].ocrRecognizeRecordId
            // this.ocrRecognizeListObj.currentOcrRecognizeRecordId = ocrRecognizeRecordId
            // this.currentOcrRecognizeRecordId = ocrRecognizeRecordId
            this.dataList = this.dataList.concat(this.ocrRecognizeListObj.records)
            this.prependUploadFiles()
          }
        })
    },
    prependUploadFiles () {
      if (this.ocrRecognizeListObj) {
        this.dataList = []
        const recognizeRecords = this.deepClone(this.ocrRecognizeListObj.records)
        const pureRecognizeRecords = this.getPureDataList(recognizeRecords)
        this.dataList = this.currentUploadFiles.concat(pureRecognizeRecords)
        this.ocrRecognizeListObj.records = this.dataList
        this.ocrRecognizeListObj.total = this.dataList.length
      }
    },
    getPureDataList (records) {
      return records.filter(rec => rec.uploadStatus === undefined)
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
    },
    deepClone (obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>

<style lang="scss">
  .viewer-container {
    height: 600px !important;
  }
  .bswrapperContainer {
    height: 600px; // height: 100%;
  }
  .bswrapper {
    position: relative;
    height: 100%;
    padding: 0 10px;
    border: 1px solid rgba(232, 232, 232, 1);
    overflow: hidden;
  }
  .data-list {
    padding: 0;
    min-height: 650px;
    height: 100%;
  }
  .dataListItem {
    padding: 10px 0;
    list-style: none; // border-bottom: 1px solid #ccc;
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
