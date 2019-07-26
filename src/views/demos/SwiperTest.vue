<template>
  <div class="swiper-container">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="url in urls" :key="url">
        <img :src="url">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination swiper-pagination-fraction" slot="pagination">
        <el-button @click="alert('515')">放大</el-button>515
      </div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
// swiper options example:
export default {
  name: 'carrousel',
  data () {
    return {
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3267295166,2381808815&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429654663,2972188411&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3597323878,2962972725&fm=26&gp=0.jpg'
      ],
      swiperOption: {
        zoom: true,
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        // scrollbar: {
        //   el: '.swiper-scrollbar'
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .swiper-container {
    width: 600px;
    height: 300px;
    background-color: antiquewhite;
  }
  .swiper-pagination-fraction {
    color: white;
  }
</style>
