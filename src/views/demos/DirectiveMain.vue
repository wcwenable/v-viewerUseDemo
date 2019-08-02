<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-upload v-show="!isNeedHideUpload" accept="image/png, image/jpeg" drag action="" :limit="MAXFILESNUM" :on-exceed="handleOnExceed" :show-file-list="false" multiple>
          <img src="@/assets/ocr/upload@2x.png">
          <div class="el-upload__text uploadDesc">您可以拖拽上传也可以选择<em>本地文件</em><br>支持JPG/PNG格式，大小4M以内</div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
        <recognize-situation-list @onToggleFullPreview="handleToggleFullPreview" ref="recognizeSituationList"></recognize-situation-list>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">4324234</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RecognizeSituationList from '@/views/demos/RecognizeSituationList'
export default {
  components: {
    RecognizeSituationList
  },
  data () {
    return {
      MAXFILESNUM: 20,
      isNeedHideUpload: false
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    handleToggleFullPreview (newVal) {
      this.isNeedHideUpload = newVal
    },
    handleOnExceed (files, fileList) {
      // console.log('handleOnExceed (files, fileList515', files, fileList)
      this.$message.warning(`您选择了${files.length}张图片，超过了单次上传限制(${this.MAXFILESNUM}张)！`)
    }
  }
}
</script>

<style lang="scss">
  .uploadDesc {
    margin-top: 20px;
  }
  .el-upload-dragger {
    padding: 20px 0;
    height: auto;
    width: 500px;
  }
</style>
