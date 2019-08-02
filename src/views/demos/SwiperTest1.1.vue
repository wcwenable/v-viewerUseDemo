<template>
  <div class="swiper-container">
    <swiper :options="swiperOption" class="swiper-wrapper" ref="mySwiper">
      <!-- slides -->
      <div class="refresh">{{refreshText}}</div>
      <swiper-slide v-for="url in urls" :key="url">
        <img class="imgSelf" :src="url">
      </swiper-slide>
      <div class="loadmore">{{loadMoreText}}</div>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
// swiper options example:
export default {
  name: 'carrousel',
  data () {
    return {
      refreshEnd: false,
      times: 0, // 加载次数
      oriSpeed: 300,
      refreshText: '释放刷新',
      loadMoreText: '加载更多',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3267295166,2381808815&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429654663,2972188411&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3597323878,2962972725&fm=26&gp=0.jpg'
      ],
      swiperOption: {
        direction: 'vertical',
        scrollbar: '.swiper-scrollbar',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        on: {
          // TouchMove: function (swiper) { // 手动滑动中触发
          //   const context = this

          //   if (swiper.translate < 50 && swiper.translate > 0) {
          //     context.refreshText = '下拉刷新...'
          //   } else if (swiper.translate > 50) {
          //     context.refreshText = '释放刷新...'
          //   }
          // },
          // 下拉释放刷新
          touchEnd: (e) => {
            // console.log('e515', e)
            var _viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight
            var _contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight
            const context = this
            const swiper = this.$refs.mySwiper.swiper
            // debugger
            // 上拉加载
            if (swiper.translate <= _viewHeight - _contentHeight - 50 && swiper.translate < 0) {
              swiper.allowTouchMove = false // 禁止触摸
              swiper.params.virtualTranslate = true // 定住不给回弹
              // // console.log("已经到达底部！");

              // if (loadFlag) {
              //   context.loadMoreText = '正在加载...'
              // } else {
              //   context.loadMoreText = '没有更多啦！'
              // }

              setTimeout(function () { // 模仿AJAX
                for (let m = 0; m < 20; m++) {
                  swiper.appendSlide('<div class="swiper-slide">moreSlide' + (context.times * 20 + m + 1) + '</div>')
                }
                swiper.params.virtualTranslate = false
                swiper.allowTouchMove = true
                context.times++
                context.loadMoreText = '加载更多...'
                // swiper.update()
              }, 1000)
            }

            if (swiper.translate >= 100) {
              swiper.allowTouchMove = false // 禁止触摸
              swiper.params.virtualTranslate = true // 定住不给回弹
              // swiper.setTransition(swiper.params.speed)
              // swiper.setTranslate(50)
              // swiper.touchEventsData.isTouched = false // 跳过touchEnd事件后面的跳转(4.0.5)
              context.refreshText = '刷新中'
              setTimeout(function () { // 模仿AJAX
                swiper.removeAllSlides()
                for (let i = 0; i < 20; i++) {
                  swiper.appendSlide('<div class="swiper-slide">New Slide' + (i + 1) + '</div>')
                  context.refreshText = '刷新完成'
                  context.refreshEnd = true
                  swiper.params.virtualTranslate = false
                  swiper.allowTouchMove = true
                  // swiper.update()
                }
              }, 1000)
            }
            return false
          },
          touchStart: () => {
            const context = this
            // const swiper = this.$refs.mySwiper.swiper
            if (context.refreshEnd === true) {
              context.refreshText = '释放刷新'
              context.refreshEnd = false
            }
          }
        }
      }
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
  html,
  body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    width: 600px;
    height: 800px;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    height: 100px;
    line-height: 100px;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .refresh {
    position: absolute;
    line-height: 100px;
    bottom: 100%;
    text-align: center;
    width: 100%;
  }
  .loadmore {
    position: absolute;
    line-height: 20px;
    top: 100%;
    text-align: center;
    width: 100%;
  }
  .imgSelf {
    // margin: 5px;
    height: 200px;
    width: 400px;
  }
</style>
