import animejs from 'animejs/lib/anime.es.js'

const animations = []

function webkitPrefixWorkaround (anim) {
  // el.style.webkitTransform = el.style.transform
  anim.animatables.forEach(a => {
    a.target.style.webkitTransform = a.target.style.transform
  })
}

function sync (fn) {
  return (params) => {
    const updatedParams = {
      ...params,
      autoplay: false
    }
    if (process.env.NODE_ENV === 'production') {
      if (params.update) {
        updatedParams.update = anim => {
          params.update(anim)
          webkitPrefixWorkaround(anim)
        }
      } else {
        updatedParams.update = webkitPrefixWorkaround
      }
    }
    const anim = fn(updatedParams)
    anim.finished.then(() => {
      animations.splice(animations.indexOf(anim), 1)
    })
    animations.push(anim)
    return anim
  }
}

const anime = sync(animejs)
const { timeline, ...rest } = animejs
Object.assign(anime, rest)
Object.assign(anime, { timeline: sync(timeline)})

export default anime

export function tick (t) {
  animations.forEach(anim => anim.tick(t))
}
