<template>
  <div class="core-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div class="scroll-item" v-for="(item, index) in emojis" :key="index" @click="clickHandler(item)">{{item}}</div>
      </div>
      <div class="pullup-wrapper">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">Pull up and load more</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel)
BScroll.use(PullDown)
BScroll.use(Pullup)
export default {
  data () {
    return {
      isPullUpLoad: false,
      count: 0,
      emojis: [
        '😀 😁 😂 🤣 😃',
        '😄 😅 😆 😉 😊',
        '😫 😴 😌 😛 😜',
        '👆🏻 😒 😓 😔 👇🏻',
        '😑 😶 🙄 😏 😣',
        '😞 😟 😤 😢 😭',
        '🤑 😲 ☹️ 🙁 😖',
        '👍 👎 👊 ✊ 🤛',
        '☝️ ✋ 🤚 🖐 🖖',
        '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
        '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
        '🌖 🌗 🌘 🌑 🌒',
        '💫 💥 💢 💦 💧',
        '🐠 🐟 🐬 🐳 🐋',
        '😬 😐 😕 😯 😶',
        '😇 😏 😑 😓 😵',
        '🐥 🐣 🐔 🐛 🐤',
        '💪 ✨ 🔔 ✊ ✋',
        '👇 👊 👍 👈 👆',
        '💛 👐 👎 👌 💘'
      ]
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.bs.destroy()
  },
  methods: {
    init () {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollY: true,
        click: true,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        pullDownRefresh: true,
        pullUpLoad: {
          threshold: -50
        },
        probeType: 3 // listening scroll hook
      })
      this._registerHooks(['scroll', 'scrollEnd'], (pos) => {
        // console.log('done')
      })
      this._registerHooks(['pullingUp'], this.pullingUpHandler)
    },
    async pullingUpHandler () {
      this.isPullUpLoad = true
      await this.requestData()
      this.bs.finishPullUp()
      this.bs.refresh()
      this.isPullUpLoad = false
    },
    async requestData () {
      try {
        const newData = await this.ajaxGet(/* url */)
        this.emojis.push(newData)
      } catch (err) {
        // handle err
        // console.log(err)
      }
    },
    ajaxGet (/* url */) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(`${++this.count}`)
        }, 1000)
      })
    },
    clickHandler (item) {
      alert(item)
    },
    _registerHooks (hookNames, handler) {
      hookNames.forEach((name) => {
        this.bs.on(name, handler)
      })
    }
  }
}
</script>

<style lang="scss">
  .core-container {
    & .scroll-wrapper {
      height: 400px;
      width: 600px;
      overflow: hidden;
      & .scroll-item {
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        font-weight: bold;
        border-bottom: 1px solid #eee;
        text-align: center;
        &:nth-child(2n) {
          background-color: #f3f5f7;
        }
        &:nth-child(2n+1) {
          background-color: #42b983;
        }
      }
    }
    & .pullup-wrapper {
      height: 100%;
      padding: 0 10px;
      border: 1px solid #ccc;
      overflow: hidden;
      padding: 20px;
      text-align: center;
      color: yellow;
    }
  }
</style>
