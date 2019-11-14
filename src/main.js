import Vue from 'vue'
import App from './App.vue'
import DevApp from './DevApp.vue'
import Icon from './components/Icon.vue'

// Content component
import Scene from './Scene.vue'

Vue.config.productionTip = false
Vue.component('icon', Icon)

new Vue({
  render (h) {
    const params = {
      scopedSlots: {
        default: props => h(Scene, { props })
      }
    }
    const targetComp = window.webvfx ? App : DevApp
    return h(targetComp, params)
  }
}).$mount('#app')
