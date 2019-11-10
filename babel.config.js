module.exports = {
  presets: [["@vue/cli-plugin-babel/preset", {
    useBuiltIns: "usage",
    polyfills: [
      // module filenames from .\node_modules\core-js\modules\
      'es.promise',
      'es.symbol',
      'es.map' // required by animejs
    ],
  }]]
}
