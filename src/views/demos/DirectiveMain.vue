<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div v-if="isShowPreview">
          <recognize-picture-full-preview @onClosePreview="handleClosePreview" ref="recognizePictureFullPreview" @ocrRecognizeListObjChange="handleOcrRecognizeListObjChange" @onFullPreviewDelete="handleRecognizeRecordDelete" :ocrRecognizeListObj='ocrRecognizeListObj'>
          </recognize-picture-full-preview>
        </div>
        <div v-if="!isShowPreview">
          <recognize-small-picture :currentOcrRecognizeRecordId="currentOcrRecognizeRecordId" v-for="item in ocrRecognizeRecords" :recognizeRecord="item" @onSmallPictureDelete="handleRecognizeRecordDelete" @onSmallPictureClick="handleShowPreview" :key="item.ocrRecognizeRecordId"></recognize-small-picture>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">23434</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RecognizePictureFullPreview from '@/views/demos/RecognizePictureFullPreview'
import RecognizeSmallPicture from '@/views/demos/RecognizeSmallPicture'
export default {
  name: 'carrousel',
  components: {
    RecognizePictureFullPreview,
    RecognizeSmallPicture
  },
  data () {
    return {
      ocrRecognizeListObj: null,
      isShowPreview: false,
      currentOcrRecognizeRecordId: null
    }
  },
  created () {
    this.$http.post('/api/getOcrRecognizeList').then(res => {
      console.log('getOcrRecognizeList> res515', res, res.data.data)
      this.ocrRecognizeListObj = res.data && res.data.data
      if (this.ocrRecognizeListObj && this.ocrRecognizeListObj.records && this.ocrRecognizeListObj.records.length) {
        this.ocrRecognizeListObj.currentOcrRecognizeRecordIndex = 0
        this.currentOcrRecognizeRecordId = this.ocrRecognizeListObj.records[0].ocrRecognizeRecordId
      }
    })
  },
  mounted () {},
  computed: {
    ocrRecognizeRecords () {
      return this.ocrRecognizeListObj && this.ocrRecognizeListObj.records
    },
    getCurrentOcrRecognizeRecordId () {
      return this.ocrRecognizeRecords && this.ocrRecognizeRecords[this.ocrRecognizeListObj.currentOcrRecognizeRecordIndex].ocrRecognizeRecordId
    }
  },
  methods: {
    handleRecognizeRecordDelete (recognizeRecord) {
      console.log('handleRecognizeRecordDelete (recognizeRecord515', recognizeRecord)
      this.$message.warning('删除图片识别记录here!')
    },
    handleOcrRecognizeListObjChange (newVal) {
      console.log('handleOcrRecognizeListObjChange (newVal515', newVal)
      this.ocrRecognizeListObj = newVal && this.$refs.recognizePictureFullPreview.deepClone(newVal)
      this.currentOcrRecognizeRecordId = this.getCurrentOcrRecognizeRecordId
    },
    handleClosePreview () {
      this.isShowPreview = false
    },
    handleShowPreview (ocrRecognizeRecord) {
      const ocrRecognizeRecordId = ocrRecognizeRecord.ocrRecognizeRecordId
      this.ocrRecognizeListObj.currentOcrRecognizeRecordIndex = this.ocrRecognizeListObj.records.findIndex(rec => rec.ocrRecognizeRecordId === ocrRecognizeRecordId)
      this.currentOcrRecognizeRecordId = ocrRecognizeRecordId
      this.isShowPreview = true
    }
  }
}
</script>

<style lang="scss">

</style>
