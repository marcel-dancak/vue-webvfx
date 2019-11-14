<template>
  <div id="app">
    <div
      ref="sceneContainer"
      class="scene-container"
    >
      <div :style="sceneStyle">
        <video
          v-if="videoSrc"
          ref="video"
          :src="videoSrc"
          @loadedmetadata="loadVideoParams"
        />
        <slot :time="time"/>
      </div>
    </div>
    <time-controls
      :time.sync="time"
      :playing.sync="playing"
      :video-length="videoLength"
      class="time-slider"
      width="400"
    />
  </div>
</template>

<script>
import TimeControls from '@/components/TimeControls'

export default {
  name: 'app',
  components: { TimeControls },
  data () {
    return {
      videoSrc: 'video/gisquick.mp4',
      time: -0.01,
      playing: false,
      videoLength: 20,
      aspectRatio: 16/9,
      sceneStyle: {
        width: '',
        height: ''
      }
    }
  },
  watch: {
    playing (playing) {
      if (this.$refs.video) {
        if (playing) {
          this.$refs.video.play()
        } else {
          this.$refs.video.pause()
        }
      }
    },
    time (time) {
      if (!this.playing) {
        this.$refs.video.currentTime = time
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateSceneSize)
    this.updateSceneSize()
  },
  methods: {
    updateSceneSize () {
      const containerEl = this.$refs.sceneContainer
      const ratio = this.aspectRatio
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
    },
    loadVideoParams (evt) {
      const video = evt.target
      this.videoLength = Math.round(video.duration)
      this.aspectRatio = video.videoWidth / video.videoHeight
      this.updateSceneSize()
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

  display: flex;
  flex-direction: column;
  max-height: 100%;
}
.scene {
  position: relative;
  > * {
    position: absolute;
  }
}
</style>

<style lang="scss" scoped>
.scene-container {
  flex: 1 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin: 4px;
  > div {
    display: grid;
    > * {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
    video {
      width: 100%;
    }
  }
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
</style>
