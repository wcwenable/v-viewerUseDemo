import Vue from 'vue'
import router from './router'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css' // 使用 CSS
/* 引入资源请求插件 */
import VueResource from 'vue-resource'
import App from './App.vue'

/* 使用VueResource插件 */
Vue.use(VueResource)
Vue.use(iView)

Vue.use(ElementUI)

Vue.use(Viewer)
Viewer.setDefaults({
  'inline': true,
  'button': false, // 右上角按钮
  'navbar': false, // 底部缩略图
  'title': false, // 当前图片标题
  'toolbar': false, // 底部工具栏
  'tooltip': true, // 显示缩放百分比
  'movable': true, // 是否可以移动
  'zoomable': true, // 是否可以缩放
  'rotatable': true, // 是否可旋转
  'scalable': false, // 是否可翻转
  'transition': true, // 使用 CSS3 过度
  'fullscreen': false, // 播放时是否全屏
  'keyboard': false, // 是否支持键盘
  'url': 'data-source',
  ready: function (e) {
    console.log(e.type, '组件以初始化')
  },
  show: function (e) {
    console.log(e.type, '图片显示开始')
  },
  shown: function (e) {
    console.log(e.type, '图片显示结束')
  },
  hide: function (e) {
    console.log(e.type, '图片隐藏完成')
  },
  hidden: function (e) {
    console.log(e.type, '图片隐藏结束')
  },
  view: function (e) {
    console.log(e.type, '视图开始')
  },
  viewed: function (e) {
    console.log(e.type, '视图结束')
    // 索引为 1 的图片旋转20度
    if (e.detail.index === 1) {
      this.viewer.rotate(20)
    }
  },
  zoom: function (e) {
    console.log(e.type, '图片缩放开始')
  },
  zoomed: function (e) {
    console.log(e.type, '图片缩放结束')
  }
})

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
