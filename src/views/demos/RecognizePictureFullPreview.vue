<template>
  <div class="fullPreviewContainer">
    <el-row class="zeroPaddingMargin">
      <el-col :span="23">
        <div class="grid-content bg-purple">
          <viewer ref="viewer" @inited="inited" :options="viewerOptions" :images="currentImages" style="height: 450px;">
            <div v-for="item in currentImages" :key="item.ocrRecognizeRecordId">
              <img :src="item.picUrl" height="100">
            </div>
          </viewer>
          <el-row class="deleteRow">
            <el-col :span="12" class="leftCol">
              <div class="operationSection" v-show="!isMadeOrder(currentOcrRecognizeRecords[currentPicIndex])">
                <span @click="handleRecognizeDelete"><img src="@assets/ocr/delete.png" ></span>
              </div>
            </el-col>
            <el-col :span="numSpan" class="rightCol">
              <div class="operationSection numberSection">
                {{currentPicIndex + 1}}/{{picTotal}}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="1" class="zeroPaddingMargin leftOffset">
        <el-row class="closeBtnForFullPreview">
          <el-col :span="24">
            <span @click="handleClosePreview"><img  src="@assets/ocr/closeGray.png" ></span>
          </el-col>
        </el-row>
        <el-row class="otherBtn">
          <el-col :span="24">
            <div class="operationSection">
              <span @click="handleZoomInClick(0.5)"><img src="@assets/ocr/zoomIn.png" ></span>
            </div>
            <div class="operationSection">
              <span @click="handleZoomInClick(-0.5)"><img src="@assets/ocr/zoomOut.png" ></span>
            </div>
            <div class="operationSection">
              <span @click="handleRotateClick(90)"><img src="@assets/ocr/rotate.png" ></span>
            </div>
            <div class="operationSection">
              <span @click="handlePreviousClick"><img src="@assets/ocr/previous.png" ></span>
            </div>
            <div class="operationSection">
              <span @click="handleNextClick"><img src="@assets/ocr/next.png" ></span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// swiper options example:
export default {
  name: 'carrousel',
  props: {
    ocrRecognizeListObj: {
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      currentOcrRecognizeListObj: null,
      form: {
        view: 2,
        zoom: -0.1,
        zoomTo: 0.8,
        rotate: 90,
        rotateTo: 180,
        scaleX: 1,
        scaleY: 1
      },
      currentViewer: null,
      viewerOptions: {
        'inline': true,
        'button': false, // 右上角按钮
        'navbar': false, // 底部缩略图
        'title': false, // 当前图片标题
        'toolbar': false, // 底部工具栏
        'tooltip': true, // 显示缩放百分比
        'movable': true, // 是否可以移动
        'zoomable': true, // 是否可以缩放
        'rotatable': true, // 是否可旋转
        'scalable': false, // 是否可翻转
        'transition': true, // 使用 CSS3 过度
        'fullscreen': false, // 播放时是否全屏
        'keyboard': false, // 是否支持键盘
        'url': 'data-source',
        ready: function (e) {
          // console.log(e.type, '组件以初始化')
        },
        show: function (e) {
          // console.log(e.type, '图片显示开始')
        },
        shown: function (e) {
          // console.log(e.type, '图片显示结束')
        },
        hide: function (e) {
          // console.log(e.type, '图片隐藏完成')
        },
        hidden: function (e) {
          // console.log(e.type, '图片隐藏结束')
        },
        view: function (e) {
          // console.log(e.type, '视图开始')
        },
        viewed: function (e) {
          // console.log(e.type, '视图结束')
          // 索引为 1 的图片旋转20度
          if (e.detail.index === 1) {
            this.viewer.rotate(20)
          }
        },
        zoom: function (e) {
          // console.log(e.type, '图片缩放开始')
        },
        zoomed: function (e) {
          // console.log(e.type, '图片缩放结束')
        }
      }
    }
  },
  watch: {
    ocrRecognizeListObj: {
      deep: true,
      handler: function (newVal) {
        console.log('ocrRecognizeListObj515', newVal)
        this.currentOcrRecognizeListObj = newVal && this.deepClone(newVal)
      }
    }
  },
  created () {
    this.currentOcrRecognizeListObj = this.deepClone(this.ocrRecognizeListObj)
  },
  computed: {
    currentOcrRecognizeRecordId () {
      return this.currentOcrRecognizeListObj && this.currentOcrRecognizeListObj.currentOcrRecognizeRecordId
    },
    currentPicIndex () {
      return this.currentOcrRecognizeRecords && this.currentOcrRecognizeRecordId && this.currentOcrRecognizeRecords.findIndex(recognizeRecord => recognizeRecord.ocrRecognizeRecordId === this.currentOcrRecognizeRecordId)
    },
    picTotal () {
      return this.currentOcrRecognizeRecords && this.currentOcrRecognizeRecords.length
    },
    currentOcrRecognizeRecords () {
      const records = this.currentOcrRecognizeListObj && this.currentOcrRecognizeListObj.records
      return records && records.filter(recognizeRecord => this.isValid(recognizeRecord))
    },
    currentImages () {
      return (this.currentOcrRecognizeRecords && [this.currentOcrRecognizeRecords[this.currentPicIndex]]) || []
    },
    numSpan () {
      return this.isMadeOrder(this.currentOcrRecognizeRecords[this.currentPicIndex]) ? 24 : 12
    }
  },
  mounted () {
    // console.log('this.ocrRecognizeListObj515', this.ocrRecognizeListObj, this.currentOcrRecognizeRecords)
  },
  methods: {
    isUploadWaiting (recognizeRecord) {
      return !!recognizeRecord.isUploadWaiting
    },
    isDeleted (recognizeRecord) {
      return recognizeRecord.bizStatus === 3
    },
    isRecognizingWait (recognizeRecord) {
      return recognizeRecord.bizStatus === 1 && recognizeRecord.recognizeStatus === 1
    },
    isMadeOrder (recognizeRecord) {
      return recognizeRecord.bizStatus === 2
    },
    isValid (recognizeRecord) {
      return !this.isUploadWaiting(recognizeRecord) && !this.isDeleted(recognizeRecord) && !this.isRecognizingWait(recognizeRecord)
    },
    handleRecognizeDelete () {
      this.$emit('onFullPreviewDelete', this.currentOcrRecognizeRecords[this.currentPicIndex])
    },
    deepClone (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    handlePreviousClick () {
      // this.currentViewer && this.currentViewer.prev()
      const nextIndex = this.currentPicIndex === 0 ? (this.picTotal - 1) : Math.abs(this.currentPicIndex - 1) % this.picTotal
      this.currentOcrRecognizeListObj.currentOcrRecognizeRecordId = this.currentOcrRecognizeRecords[nextIndex].ocrRecognizeRecordId
      this.$emit('ocrRecognizeListObjChange', this.deepClone(this.currentOcrRecognizeListObj))
    },
    handleNextClick () {
      // this.currentViewer && this.currentViewer.next()
      const nextIndex = (this.currentPicIndex + 1) % this.picTotal
      this.currentOcrRecognizeListObj.currentOcrRecognizeRecordId = this.currentOcrRecognizeRecords[nextIndex].ocrRecognizeRecordId
      this.$emit('ocrRecognizeListObjChange', this.deepClone(this.currentOcrRecognizeListObj))
    },
    handleRotateClick (value) { // 旋转
      this.currentViewer && this.currentViewer.rotate(value || this.form.rotate)
    },
    handleZoomInClick (value) { // 放大
      this.currentViewer && this.currentViewer.zoom(value || this.form.zoom)
    },
    handleZoomOutClick (value) { // 缩小
      this.currentViewer && this.currentViewer.zoom(value || this.form.zoom)
    },
    inited (viewer) {
      this.currentViewer = viewer
    },
    handleClosePreview () {
      this.$emit('onClosePreview')
    }
  }
}
</script>

<style lang="scss">
  .fullPreviewContainer {
    height: 100%;
    width: 100%;
  }
  .zeroPaddingMargin {
    padding: 0;
    margin: 0;
    & .leftOffset {
      margin-left: -40px;
    }
  }
  .closeBtnForFullPreview {
    height: 100%;
    margin-top: 10px;
    margin-left: -20px;
    z-index: 10000;
    position: relative;
    cursor: pointer;
  }
  .operationSection {
    @extend .closeBtnForFullPreview; // margin-top: 50px;
    &+.operationSection {
      margin-top: 10px;
    }
  }
  .otherBtn {
    padding-top: 268px;
    height: 100%;
  }
  .deleteRow {
    text-align: right;
    padding-bottom: 10px;
    margin-top: 105px;
    & .rightCol {
      padding-right: 20px;
      padding-bottom: 8px;
      color: white;
    }
  }
  .numberSection {
    width: 36px;
    height: 19px;
    background: rgba(39, 39, 39, 1);
    border-radius: 10px;
    float: right;
    text-align: center;
    margin-top: 15px;
    cursor: auto;
  }
</style>
