<template>
  <div>
    <el-row>
      <el-col :span="12">
        <recognize-picture-full-preview></recognize-picture-full-preview>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">23434</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RecognizePictureFullPreview from '@/views/demos/RecognizePictureFullPreview'
export default {
  name: 'carrousel',
  components: {
    RecognizePictureFullPreview
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">

</style>
