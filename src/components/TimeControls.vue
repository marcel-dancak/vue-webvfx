<template>
  <div class="time-slider">
    <div class="toolbar">
      <button @click="updateValue(0)">
        <icon name="skip_previous"/>
      </button>
      <button v-if="playing" @click="stop">
        <icon name="pause_circle_filled"/>
      </button>
      <button v-else @click="start">
        <icon name="play_circle_filled"/>
      </button>
      <button @click="updateValue(videoLength)">
        <icon name="skip_next"/>
      </button>
      <div class="spacer"/>
      <label class="time">{{ prettyTime }} <small>/ {{ videoLength }}</small></label>
    </div>
    <vue-slider
      :width="numWidth"
      :duration="0.1"
      tooltip="none"
      :value="value"
      :max="videoLength"
      @change="updateValue"
    />
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: { VueSlider },
  props: {
    value: Number,
    videoLength: Number,
    width: [Number, String]
  },
  data () {
    return {
      playing: false
    }
  },
  computed: {
    prettyTime () {
      return this.value.toFixed(1)
    },
    numWidth () {
      return parseInt(this.width)
    }
  },
  mounted () {
    document.addEventListener('keydown', e => {
      if (e.code === 'Home') {
        this.updateValue(0)
      } else if (e.code === 'ArrowLeft') {
        this.updateValue(Math.max(0, this.value - 2))
      } else if (e.code === 'ArrowRight') {
        this.updateValue(Math.min(this.videoLength, this.value + 2))
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
    updateValue (value) {
      this.$emit('input', value)
    },
    stop () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.playing = false
    },
    start () {
      this.timer = setInterval(() => {
        this.updateValue(Math.min(this.value + 0.05, this.videoLength))
        if (this.value >= this.videoLength) {
          this.stop()
        }
      }, 50)
      this.playing = true
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
