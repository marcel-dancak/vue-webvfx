import Vue from 'vue'
import Icon from './components/Icon.vue'

// Content component
import Scene from './Scene.vue'

// const App = window.webvfx ? require('./App.vue').default : require('./DevApp.vue').default
const App = process.env.NODE_ENV === 'development'
  ? require('./DevApp.vue').default
  : require('./App.vue').default

Vue.config.productionTip = false
Vue.component('icon', Icon)

new Vue({
  render (h) {
    const params = {
      scopedSlots: {
        default: props => h(Scene, { props })
      }
    }
    return h(App, params)
  }
}).$mount('#app')
