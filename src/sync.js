const animations = []

export function sync (fn) {
  return (params) => {
    const anim = fn({...params, autoplay: false})
    anim.finished.then(() => {
      animations.splice(animations.indexOf(anim), 1)
    })
    animations.push(anim)
    return anim
  }
}

export function tick (t) {
  animations.forEach(anim => anim.tick(t))
}
