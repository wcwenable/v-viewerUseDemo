<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-upload :disabled="isNeedHideUpload" :headers="{ Authorization: authorization}" drag action="" :show-file-list="false" multiple :http-request="handleUploadManually" :before-upload="beforeImageUpload">
          <div class="el-upload__tip" slot="tip"></div>
          <div slot="trigger" :class="triggerClass">
            <img src="@/assets/ocr/upload@2x.png">
            <div class="el-upload__text uploadDesc">您可以拖拽上传也可以选择<em>本地文件</em><br>支持JPG/PNG格式，大小4M以内</div>
          </div>
        </el-upload>
        <div v-if="uploadErrList.length > 0" class="uploadErr">
          <el-alert title="以下文件上传失败"
          type="error"
          @close="handleErrAlertClose"
          effect="dark">
            <ul>
              <li class="errli" v-for="(err, index) in uploadErrList" :key="index">{{err}}</li>
            </ul>
          </el-alert>
        </div>
        <recognize-situation-list :uploadFiles= "uploadFiles" @onToggleFullPreview="handleToggleFullPreview" ref="recognizeSituationList"></recognize-situation-list>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">4324234</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RecognizeSituationList from '@/views/demos/RecognizeSituationList'
import localforage from 'localforage'
import _ from 'lodash'
export default {
  components: {
    RecognizeSituationList
  },
  data () {
    return {
      // 单次最多允许同时上传的文件数量
      MAXFILESNUM: 20,
      UPLOADED: 2,
      isNeedHideUpload: false,
      canUploadMore: true,
      authorization: null,
      uploadErrList: [],
      currentOcrTemplateId: '1234556',
      uploadFiles: []
    }
  },
  created () {
    this.$http.post('/api/authcenter/user/login', {
      username: 'fetest',
      password: '79043ac2819b1864fa2030f686c26f46'
    }, {
      emulateJSON: true
    }).then(res => {
      this.authorization = res.data.data.token
      // console.log('login>res515', res, res.data.data.token)
    })

    // 清除已上传的图片缓存
    this.clearUploadedFiles()

    // this.removeCachedUploadFiles()
  },
  mounted () {},
  computed: {
    triggerClass () {
      return {
        'triggerClass': this.isNeedHideUpload
      }
    }
  },
  methods: {
    handleErrAlertClose () {
      this.uploadErrList = []
    },
    beforeImageUpload (file) { // 上传文件前的钩子对文件进行校验
      const isValidSize = file.size <= 1 * 1024 * 1024
      const isValidType = ['image/png', 'image/jpeg'].includes(file.type)
      let errDesc = `文件【${file.name}】:`
      !isValidSize && (errDesc = `${errDesc}超过了4M！`)
      !isValidType && (errDesc = `${errDesc}不受支持的图片格式！`)
      const isValid = isValidSize && isValidType
      !isValid && this.uploadErrList.push(errDesc)
      return isValid
    },
    async handleUploadManually (file) {
      const actualFile = file.file

      const isInCache = this.uploadFiles.some(file => file.name === actualFile.name)

      if (isInCache) {
        this.uploadErrList.unshift(`文件【${actualFile.name}】已在上传队列中，请勿重复上传！`)
      } else {
        actualFile.headers = file.headers
        actualFile.uploadStatus = 0 // (0:还未手动上传，1：正在上传，2：已上传，此时需要从缓存中删除)
        const countCachedFiles = this.uploadFiles.length
        this.uploadFiles.push({
          ocrRecognizeRecordId: `orrId${countCachedFiles}`,
          ocrTemplateId: this.currentOcrTemplateId,
          picUrl: require('@/assets/ocr/uploadBackground.jpg'),
          uploadStatus: 0,
          name: actualFile.name,
          type: actualFile.type,
          file: actualFile
        })
        await this.setCachedUploadFiles(this.uploadFiles)
      }

      // console.log('handleUploadManually (file515', file, this.uploadFiles, actualFile.name)
    },
    handleToggleFullPreview (newVal) {
      this.isNeedHideUpload = newVal
    },
    async getCacheddUploadFiles () {
      return localforage.getItem('uploadFiles').then(value => {
        // console.log('getCacheddUploadFiles>value515', value)
        return value || []
      }).catch(err => {
        // console.log('getCacheddUploadFiles>err515', err)
        return []
      })
    },
    submitUploadFileRequest (file) {
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('type', file.file.type)
      this.$http.post('/api/common/v1/uploadFile', formData).then(res => {
        // console.log('v1/uploadFile>res515', res)
      })
    },
    removeCachedUploadFiles () {
      localforage.removeItem('uploadFiles').then(() => {
        // Run this code once the key has been removed.
        this.uploadFiles = []
        // console.log('uploadFiles is cleared!')
      }).catch(function (err) {
        // This code runs if there were any errors
        // console.log('removeItem(uploadFiles515', err)
      })
    },
    setCachedUploadFiles () {
      // Unlike localStorage, you can store non-strings.
      return localforage.setItem('uploadFiles', this.uploadFiles).then(value => {
        // console.log('setCachedUploadFiles>vaule515', value)
      }).catch(function (err) {
        // console.log('setCachedUploadFiles>err', err)
      })
    },
    deepClone (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    async clearUploadedFiles () {
      let currentCachedFiles = await this.getCacheddUploadFiles()
      this.uploadFiles = this.deepClone(currentCachedFiles)
      // console.log('clearUploadedFiles>currentCachedFiles515', currentCachedFiles)
      const isExistUploaded = currentCachedFiles = currentCachedFiles.some(file => file.uploadStatus === 2)
      if (isExistUploaded) {
        currentCachedFiles = currentCachedFiles.filter(file => file.uploadStatus !== this.UPLOADED)
        this.setCachedUploadFiles(currentCachedFiles)
      }
    }
  }
}
</script>

<style lang="scss">
  .triggerClass {
    cursor: not-allowed;
  }
  .uploadDesc {
    margin-top: 20px;
  }
  .el-upload-dragger {
    padding: 20px 0;
    height: auto;
    width: 500px;
  }
  .uploadErr {
    margin: 10px;
    align-items: center;
  }
  .errli {
    text-align: left;
  }
</style>
