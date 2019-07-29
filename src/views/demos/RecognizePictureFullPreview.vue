<template>
  <div>
    <el-row class="zeroPaddingMargin">
      <el-col :span="23">
        <div class="grid-content bg-purple">
          <viewer ref="viewer" @inited="inited" :images="currentImages" style="height: 450px;">
            <div v-for="item in currentImages" :key="item.ocrRecognizeRecordId">
              <img :src="item.picUrl" height="100">
            </div>
          </viewer>
          <el-row class="deleteRow">
            <el-col :span="12" class="leftCol">
              <div class="operationSection">
                <span @click="handleRecognizeDelete"><img src="@assets/ocr/delete.png" ></span>
              </div>
            </el-col>
            <el-col :span="12" class="rightCol">
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
      currentViewer: null
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
    }
  },
  mounted () {
    console.log('this.ocrRecognizeListObj515', this.ocrRecognizeListObj, this.currentOcrRecognizeRecords)
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
    padding-top: 200px;
    height: 100%;
  }
  .deleteRow {
    text-align: right;
    padding-bottom: 10px;
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
