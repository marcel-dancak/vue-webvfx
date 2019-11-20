<template>
  <div class="time-slider">
    <div class="toolbar">
      <button @click="updateTime(-0.01)">
        <icon name="skip_previous"/>
      </button>
      <button v-if="playing" @click="stop">
        <icon name="pause_circle_filled"/>
      </button>
      <button v-else @click="start">
        <icon name="play_circle_filled"/>
      </button>
      <button @click="updateTime(videoLength)">
        <icon name="skip_next"/>
      </button>
      <div class="spacer"/>
      <label class="time">{{ time | timeformat }} <small>/ {{ videoLength | timeformat }}</small></label>
    </div>
    <vue-slider
      :width="numWidth"
      :duration="0"
      tooltip="none"
      :value="sliderValue"
      :max="videoLength"
      @change="updateTime"
    />
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import { tick } from '@/anime.js'

export default {
  components: { VueSlider },
  props: {
    time: Number,
    videoLength: Number,
    width: [Number, String],
    playing: Boolean
  },
  computed: {
    sliderValue () {
      return Math.max(0, this.time)
    },
    numWidth () {
      return parseInt(this.width)
    }
  },
  filters: {
    timeformat: value => {
      if (!value) return ''
      const minute = parseInt(value / 60)
      const second = Math.round(value - minute * 60)
      return `${minute}:${second.toString().padStart(2, '0')}`
    }
  },
  mounted () {
    document.addEventListener('keydown', e => {
      if (e.code === 'Home') {
        this.updateTime(0)
      } else if (e.code === 'ArrowLeft') {
        this.updateTime(Math.max(0, this.time - 2))
      } else if (e.code === 'ArrowRight') {
        this.updateTime(Math.min(this.videoLength, this.time + 2))
      } else if (e.code === 'Space') {
        if (this.playing) {
          this.stop()
        } else {
          this.start()
        }
      }
    })
  },
  methods: {
    updateTime (value) {
      this.$emit('update:time', value)
    },
    stop () {
      this.$emit('update:playing', false)
    },
    start () {
      if (this.playing) {
        return
      }
      this.$emit('update:playing', true)

      const updateTreshold = 0.05
      const playbackStart = performance.now()
      const startTime = this.time
      const loop = currentTime => {
        const delta = Math.max(0, currentTime - playbackStart)
        const t = startTime + delta / 1000
        if (t >= this.videoLength) {
          this.stop()
          return
        }
        tick(t * 1000)
        if (Math.abs(t - this.time) > updateTreshold) {
          this.updateTime(t)
        }
        if (this.playing) {
          requestAnimationFrame(loop)
        }
      }
      requestAnimationFrame(loop)
    }
  }
}
</script>

<style lang="scss" scoped>
.spacer {
  flex: 1 1;
}
.time-slider {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 56px;

  .vue-slider {
    flex-grow: 1;
    display: flex;
    margin-top: 4px;
  }
  .toolbar {
    display: flex;
    align-items: center;
    width: 100%;
    button {
      display: flex;
      width: 32px;
      padding: 0 4px;
      margin: 2px;
      background: none;
      border: none;
      outline: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        outline: none;
      }
      &::-moz-focus-inner {
        border: 0;
      }
    }
  }
}
</style>
