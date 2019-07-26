<template>
    <div class="outer_box">
        <!-- 因为旋转是在中心点旋转的,而放大缩小是在左上角 -->
        <!-- 所以给图片的父元素加上放大缩小 -->
        <!-- 给图片加上旋转 -->
        <div class="img_box"
             :style="{transform:'scale('+multiples+')',transformOrigin:'top left'}">
            <img :src="imgSrc"
             alt=""
             :style="{transform:'rotateZ('+deg+'deg)'}"
             v-drag>
        </div>
        <!-- 点击时旋转90度 -->
        <el-button @click="magnify">放大</el-button>
        <!-- 缩小0.25 -->
        <el-button @click="shrink">缩小</el-button>
        <!-- 放大0.25 -->
        <el-button @click="rotate">旋转</el-button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      imgSrc: 'https://publish-pic-cpu.baidu.com/cf60d547-a35c-4e77-8ef3-30d0e5b0e48b.jpeg@q_90,w_450',
      deg: 360,
      multiples: 1
    }
  },
  methods: {
    // 放大
    magnify () {
      if (this.multiples >= 3) {
        return
      }
      this.multiples += 0.25
    },
    // 缩小
    shrink () {
      if (this.multiples <= 0.5) {
        return
      }
      this.multiples -= 0.25
    },
    // 旋转
    rotate () {
      this.deg += 90
      if (this.deg >= 360) {
        this.deg = 0
      }
    }
  }
}
</script>
<style scoped>
    .outer_box{
        width: 200px;
        height: 200px;
    }
    .outer_box>div{
        white-space: nowrap;
        display: inline-block;
    }
    .outer_box>div>img{
        width: auto;
        height: auto;
        position: absolute;
    }
</style>
