<template>
  <div id="app">
    <div
      ref="sceneContainer"
      class="scene-container"
    >
      <div :style="sceneStyle">
        <slot :time="time"/>
      </div>
    </div>
    <time-controls
      v-model="time"
      :video-length="videoLength"
      class="time-slider"
      width="400"
    />
  </div>
</template>

<script>

import { tick } from '@/sync'
import TimeControls from '@/components/TimeControls'

export default {
  name: 'app',
  components: { TimeControls },
  data () {
    return {
      time: -0.01,
      videoLength: 20,
      aspectRatio: 16/9,
      sceneStyle: {
        width: '',
        height: ''
      }
    }
  },
  mounted () {
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

  display: flex;
  flex-direction: column;
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
  > * {
    position: absolute;
  }
}
</style>
