<template>
  <div class="imageContainer">
    <div class="closeBtnContainer" v-show="!isMadeOrder">
      <img src="@/assets/ocr/closeBlue.png" @click="handleCloseBtnClick" class="closeBtn">
    </div>
    <div @click="handlePicClick">
      <img :class="imageContainee" :src="recognizeRecord.picUrl">
    </div>
    <div @click="handlePicClick" class="recognizeProgressContainer">
      <img v-if="isUploadWaiting" src="@/assets/ocr/uploadWaiting.png">
      <span v-else-if='isMadeOrder' class="progressStatusTextClass">已下单</span>
      <img v-else-if="isRecognizingWait" src="@/assets/ocr/recognizingWait.png">
      <img v-else-if="isRecognizedFailed" src="@/assets/ocr/recognizedFailed.png">
      <img v-else-if="isRecognizedSuccess" src="@/assets/ocr/recognizedSuccess.png">
      <span v-else-if="isDeleted" class="progressStatusTextClass">状态异常</span>
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
    return {
    }
  },
  watch: {
  },
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
      if (this.isUploadWaiting || this.isRecognizingWait) {
        this.$message.warning('上传中或识别中的图片不允许处理！')
        return
      }
      if (this.isDeleted) {
        this.$message.warning('状态异常，已删除！')
        return
      }
      this.$emit('onSmallPictureClick', this.recognizeRecord)
    },
    handleCloseBtnClick () {
      this.$emit('onSmallPictureDelete', this.recognizeRecord)
    }
  }
}
</script>

<style lang="scss">
  .imageContainee {
    border-radius: 5px;
    width: 125px;
    height: 165px;
    box-sizing: content-box;
  }
  .imageContainer {
    width: 125px;
    height: 165px;
    cursor: pointer;
    margin: 10px;
  }
  .closeBtn {
    width: 15px;
    height: 15px;
    margin-right: -5px;
    float: right;
    position: relative;
    margin-bottom: -10px;
  }
  .recognizeProgressContainer {
    margin: -110px 0 0 0;
    position: relative;
  }
  .progressStatusTextClass {
    width: 36px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
  }
  .current {
    border: 2px solid greenyellow;
  }
</style>
