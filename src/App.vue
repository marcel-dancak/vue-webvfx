<template>
  <div id="app">
    <!-- <img ref="video" class="video"/> -->
    <slot :time="time"/>
  </div>
</template>

<script>

import { tick } from './sync'

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
      // webvfx.getImage('video').assignToHTMLImageElement(this.$refs.video)
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
