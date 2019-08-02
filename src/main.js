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

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
