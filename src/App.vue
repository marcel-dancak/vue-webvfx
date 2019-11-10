<template>
  <div id="app">
    <scene
      v-if="webvfxMode"
      :time="time"
      class="webvfx"
    />
    <div v-else class="browser-layout">
      <div ref="sceneContainer" class="scene-container">
        <scene
          :time="time"
          :style="sceneStyle"
        />
      </div>
      <time-controls
        v-model="time"
        :video-length="videoLength"
        class="time-slider"
        width="400"
      />
    </div>
  </div>
</template>

<script>
import TimeControls from '@/components/TimeControls'
import Scene from './Scene'

export default {
  name: 'app',
  components: { TimeControls, Scene },
  data () {
    return {
      videoLength: 20,
      time: 0,

      // dev only
      aspectRatio: 16/9,
      sceneStyle: {
        width: '',
        height: ''
      }
    }
  },
  computed: {
    webvfxMode () {
      return !!window.webvfx
    }
  },
  mounted () {
    if (window.webvfx) {
      const webvfx = window.webvfx
      // let frame = 0
      webvfx.renderRequested.connect(t => {
        // webvfx.getImage('video').assignToHTMLImageElement(this.$refs.video)

        // if (frame++ % 3 === 0) {
          setTimeout(() => {
            this.time = t * this.videoLength
          })
        // }
      })
      webvfx.imageTypeMap = { video : webvfx.SourceImageType }
      webvfx.readyRender(true)
    } else {
      const ratio = this.aspectRatio
      const containerEl = this.$refs.sceneContainer
      const updateSceneSize = () => {
        const bounds = containerEl.getBoundingClientRect()
        const containerRatio = bounds.width / bounds.height
        let width, height
        if (containerRatio > ratio) {
          height = bounds.height
          width = height * ratio
        } else {
          width = bounds.width
          height = width / ratio
        }
        this.sceneStyle = {
          width: Math.floor(width) + 'px',
          height: Math.floor(height) + 'px'
        }
      }
      window.addEventListener('resize', updateSceneSize)
      updateSceneSize()
    }
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
.video {
  width: 50%;
  height: 400px;
  opacity: 0.2;
}

.browser-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;

  .scene-container {
    flex: 1 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin: 4px;
    .scene {
      border: 1px solid #ddd;
      box-sizing: border-box;
    }
  }
  .time-slider {
    flex: 0 0 auto;
    margin: 0 auto;
    margin-bottom: 4px;
  }
}
.scene {
  position: relative;
  &.webvfx {
    width: 100%;
    height: 100%;
  }
  > * {
    position: absolute;
  }
}
</style>
