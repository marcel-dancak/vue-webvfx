<template>
  <div id="app">
    <slot :time="time"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { tick } from './anime.js'

const videoElems = []

export const PlaybackVideo = {
  mounted () {
    videoElems.push(this.$el)
  },
  beforeDestroy () {
    videoElems.splice(videoElems.indexOf(this.$el), 1)
  },
  render (h) {
    return h('img')
  }
}
Vue.component('playback-video', PlaybackVideo)

export default {
  name: 'app',
  data () {
    return {
      videoLength: 20,
      time: -0.01
    }
  },
  mounted () {
    const webvfx = window.webvfx
    // let frame = 0
    webvfx.renderRequested.connect(t => {
      videoElems.forEach(el => {
        webvfx.getImage('video').assignToHTMLImageElement(el)
      })
      tick(t * this.videoLength * 1000)
      // if (frame++ % 3 === 0) {
        setTimeout(() => {
          this.time = t * this.videoLength
        })
      // }
    })
    webvfx.imageTypeMap = { video : webvfx.SourceImageType }
    webvfx.readyRender(true)
  }
}
</script>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 16px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
.scene {
  position: relative;
  width: 100%;
  height: 100%;
  > * {
    position: absolute;
  }
}
</style>
