<template>
  <div class="scene">
    <!-- <img ref="video" class="video"/> -->

    <awesome-logo
      v-if="time > 1"
      class="logo"
    />
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'
import Logo from '@/assets/inline-svg/awesome_logo.svg'
import { sync } from '@/sync'

const AwesomeLogo = {
  mounted () {
    sync(anime.timeline)({})
      .add({
        targets: this.$el,
        opacity: 1,
        top: ['15%', '20%'],
        left: ['5%', '6%'],
        duration: 800,
        easing: 'spring(1, 80, 4, 0)'
      })
      .add({
        targets: this.$el.querySelectorAll('#text2 path'),
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1500,
        easing: 'easeOutQuad',
        delay: anime.stagger(80)
      }, 800)
  },
  render (h) {
    return h(Logo)
  }
}

export default {
  components: { AwesomeLogo },
  props: {
    time: Number
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 400px;
  height: 100px;
}
::v-deep {
  #text2 {
    stroke: red;
    stroke-width: 0.15;
    fill: none;
  }
}
</style>
