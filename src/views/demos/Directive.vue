<template>
  <div>
    <el-row>
      <el-col :span="12">
        <ocr-make-order-left-side></ocr-make-order-left-side>
       </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">4324234</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OcrMakeOrderLeftSide from '@/views/demos/OcrMakeOrderLeftSide'
export default {
  components: {
    OcrMakeOrderLeftSide
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {},
  computed: {
  },
  methods: {
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
