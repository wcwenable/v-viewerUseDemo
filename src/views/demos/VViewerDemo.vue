<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <viewer :images="images" style="height: 800px;">
            <img v-for="item in images" :src="item.src" :key="item.index" height="100">
          </viewer>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">1234356</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// swiper options example:
export default {
  name: 'carrousel',
  data () {
    return {
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
  }
}
</script>

<style lang="scss">

</style>
