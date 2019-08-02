<template>
  <div id="imgList" class="swiper-container">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-image @click="handleImageClick" v-for="url in urls" :key="url" :src="url"></el-image>
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
import {
  ZxImageView
} from 'zx-image-view'
export default {
  name: 'carrousel',
  data () {
    return {
      zxImageView: null,
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3267295166,2381808815&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429654663,2972188411&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3597323878,2962972725&fm=26&gp=0.jpg'
      ],
      swiperOption: {
        // width: window.innerWidth,
        zoom: true,
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  created () {
    // 初始化参数
    let _config = {
      backgroundOpacity: 0.85,
      // 分页mouseover切换图片
      paginationable: true,
      // 显示关闭按钮
      showClose: true,
      // 显示上一张/下一张箭头
      showSwitchArrow: true,
      // 显示分页导航栏
      showPagination: true,
      // 缩放
      scalable: true,
      // 旋转
      rotatable: true,
      // 移动
      movable: true,
      // 键盘配置
      keyboard: {
        prev: 'a',
        next: 'd',
        rotate: ['up', 'down'],
        scale: 'mousewheel'
      },
      showToolbar: true
    }
    this.zxImageView = new this.ZxImageView(_config)
  },
  mounted () {
    this.zxImageView && this.zxImageView.init(this.urls)
  },
  methods: {
    ZxImageView,
    handleImageClick (e) {
      // console.log('handleImageClick (e515', e)
      const target = e.target
      if (target.nodeName === 'IMG') {
        // 获取图片索引
        var index = target.getAttribute('data-index')
        // 查看图片
        this.zxImageView && this.zxImageView.view(index)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
