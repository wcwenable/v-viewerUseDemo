<template>
  <div>
    <el-row v-show="isShowPreview" class="zeroPaddingMargin">
      <el-col :span="23">
        <div class="grid-content bg-purple">
          <viewer ref="viewer" @inited="inited" :images="images" style="height: 450px;">
            <img v-for="item in images" :src="item.src" :key="item.index" height="100">
          </viewer>
          <el-row class="deleteRow">
            <el-col :span="12" class="leftCol">
              <div class="operationSection">
                <span @click="handleClosePreview"><img src="@assets/ocr/delete.png" ></span>
              </div>
            </el-col>
            <el-col :span="12" class="rightCol">
              <div class="operationSection numberSection">
                3/10
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="1" class="zeroPaddingMargin leftOffset">
        <el-row class="closeBtn">
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
    <div v-show="!isShowPreview">
      <img @click="handleShowPreview" v-for="item in images" :src="item.src" :key="item.index" height="100">
    </div>
  </div>
</template>

<script>
// swiper options example:
export default {
  name: 'carrousel',
  data () {
    return {
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
      isShowPreview: true,
      images: [{
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=26&gp=0.jpg',
        index: 1
      },
      {
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3267295166,2381808815&fm=26&gp=0.jpg',
        index: 2
      },
      {
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429654663,2972188411&fm=26&gp=0.jpg',
        index: 3
      },
      {
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3597323878,2962972725&fm=26&gp=0.jpg',
        index: 4
      }
      ]
    }
  },
  mounted () {
  },
  methods: {
    handlePreviousClick () {
      this.currentViewer && this.currentViewer.prev()
    },
    handleNextClick () {
      this.currentViewer && this.currentViewer.next()
    },
    handleRotateClick (value) {
      this.currentViewer && this.currentViewer.rotate(value || this.form.rotate)
    },
    handleZoomInClick (value) {
      this.currentViewer && this.currentViewer.zoom(value || this.form.zoom)
    },
    handleZoomOutClick (value) {
      this.currentViewer && this.currentViewer.zoom(value || this.form.zoom)
    },
    inited (viewer) {
      this.currentViewer = viewer
    },
    handleClosePreview () {
      this.isShowPreview = false
      // this.currentViewer && this.currentViewer.reset()
    },
    handleShowPreview () {
      this.isShowPreview = true
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
  .closeBtn {
    height: 100%;
    margin-top: 10px;
    margin-left: -20px;
    z-index: 10000;
    position: relative;
  }
  .operationSection {
    @extend .closeBtn; // margin-top: 50px;
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
  }
</style>
