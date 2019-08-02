<template>
  <div class="imageContainer">
    <div class="closeBtnContainer">
      <img src="@/assets/ocr/closeBlue@2x.png" v-show="!isMadeOrder" @click="handleCloseBtnClick" class="closeBtn">
      <span v-show="isMadeOrder" class="closeBtn"></span>
    </div>
    <div @click="handlePicClick">
      <img :class="imageContainee" :src="recognizeRecord.picUrl">
    </div>
    <div @click="handlePicClick" class="recognizeProgressContainer">
      <div class="recognizeProgressContainee">
        <img v-if="isUploadWaiting" src="@/assets/ocr/uploadWaiting.png">
        <span v-else-if='isMadeOrder' class="progressStatusTextClass">已下单</span>
        <img v-else-if="isRecognizingWait" src="@/assets/ocr/recognizingWait.png">
        <img v-else-if="isRecognizedFailed" src="@/assets/ocr/recognizedFailed.png">
        <img v-else-if="isRecognizedSuccess" src="@/assets/ocr/recognizedSuccess.png">
        <span v-else-if="isDeleted" class="progressStatusTextClass">状态异常</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecognizeSmallPicture',
  props: {
    recognizeRecord: {
      type: Object,
      default () {
        return {}
      }
    },
    currentOcrRecognizeRecordId: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {}
  },
  watch: {},
  created () {},
  mounted () {},
  computed: {
    isUploadWaiting () {
      return !!this.recognizeRecord.isUploadWaiting
    },
    isMadeOrder () {
      return this.recognizeRecord.bizStatus === 2
    },
    isDeleted () {
      return this.recognizeRecord.bizStatus === 3
    },
    isRecognizedSuccess () {
      return this.recognizeRecord.bizStatus === 1 && this.recognizeRecord.recognizeStatus === 3
    },
    isRecognizedFailed () {
      return this.recognizeRecord.bizStatus === 1 && this.recognizeRecord.recognizeStatus === 2
    },
    isRecognizingWait () {
      return this.recognizeRecord.bizStatus === 1 && this.recognizeRecord.recognizeStatus === 1
    },
    imageContainee () {
      return {
        'imageContainee': true,
        'current': this.currentOcrRecognizeRecordId === this.recognizeRecord.ocrRecognizeRecordId
      }
    }
  },
  methods: {
    handlePicClick () {
      this.isValid() && this.$emit('onSmallPictureClick', this.recognizeRecord, true)
    },
    isValid (isFromClose = false) {
      if (this.isUploadWaiting || this.isRecognizingWait) {
        !isFromClose && this.$message.warning('上传中或识别中的图片不允许处理！')
        // return
        this.$emit('onSmallPictureClick', this.recognizeRecord, false)
        return false
      }
      if (this.isDeleted) {
        !isFromClose && this.$message.warning('状态异常，已删除！')
        this.$emit('onSmallPictureClick', this.recognizeRecord, false)
        return false
      }
      return true
    },
    handleCloseBtnClick () {
      this.isValid(true)
      this.$emit('onSmallPictureDelete', this.recognizeRecord)
    }
  }
}
</script>

<style lang="scss">
  .imageContainee {
    border-radius: 5px;
    width: 125px;
    height: 165px; // box-sizing: content-box;
  }
  .imageContainer {
    width: 125px;
    height: 165px;
    cursor: pointer;
    margin: 10px;
  }
  .closeBtn {
    width: 25px;
    height: 25px;
    margin-right: -10px;
    float: right;
    position: relative;
    margin-bottom: -13px;
      z-index: 2;
  }

  .recognizeProgressContainer {
    margin: -171px 0 0 0;
    position: relative;
    width: 125px;
    height: 165px;
      background: rgba(58, 58, 58, 0.3);
      z-index: 1;
  }
  .recognizeProgressContainee {
    padding-top: 57px;
  }
  .progressStatusTextClass {
    width: 36px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 58px;
  }
  .current {
    border: 5px solid greenyellow;
  }
</style>
